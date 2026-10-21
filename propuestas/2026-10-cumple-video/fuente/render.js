const { chromium } = require('/opt/node-tools/node_modules/playwright');
const { spawn } = require('child_process');
const path=require('path');
(async()=>{
  const mode=process.argv[2]||'preview';
  const browser=await chromium.launch();
  const page=await browser.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:1});
  page.on('pageerror',e=>console.error('PAGEERROR',e.message));
  page.on('console',m=>{ if(m.type()==='error') console.error('CONSOLE',m.text()); });
  await page.goto('file://'+path.resolve('index.html'));
  await page.evaluate(()=>window.ready);
  await page.waitForTimeout(300);
  if(mode==='preview'){
    const times=(process.argv[3]||'2,8,14,21,28,35,42').split(',').map(Number);
    for(const t of times){ await page.evaluate(t=>window.seek(t),t); await page.waitForTimeout(50); await page.screenshot({path:`prev_${String(t).replace('.','_')}.jpg`,type:'jpeg',quality:80}); }
  } else {
    const fps=30; const total=await page.evaluate(()=>window.TOTAL); const n=Math.round(total*fps);
    const ff=spawn('ffmpeg',['-y','-f','image2pipe','-vcodec','mjpeg','-r',String(fps),'-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','fast','-movflags','+faststart','video_silent.mp4'],{stdio:['pipe','ignore','inherit']});
    const t0=Date.now();
    for(let i=0;i<n;i++){
      await page.evaluate(t=>window.seek(t),i/fps);
      const buf=await page.screenshot({type:'jpeg',quality:95});
      if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
      if(i%150===0) console.log(`frame ${i}/${n} ${((Date.now()-t0)/1000).toFixed(0)}s`);
    }
    ff.stdin.end();
    await new Promise(r=>ff.on('close',r));
    console.log('done');
  }
  await browser.close();
})();

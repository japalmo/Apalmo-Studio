import numpy as np, wave
SR=44100; BPM=66; beat=60/BPM; TOTAL=44.0
t_all=np.arange(int(SR*TOTAL))/SR
out=np.zeros_like(t_all)
def note(freq, start, dur, vel=1.0, bright=1.0):
    n=int(SR*dur); idx=int(SR*start)
    if idx>=len(out): return
    t=np.arange(n)/SR
    # piano-ish: harmonics with decaying envelope
    env=np.exp(-t*2.2)*(1-np.exp(-t*400))
    sig=(np.sin(2*np.pi*freq*t)*1.0+np.sin(2*np.pi*freq*2*t)*0.35*bright+np.sin(2*np.pi*freq*3*t)*0.12*bright+np.sin(2*np.pi*freq*4*t)*0.05*bright)
    sig=sig*env*vel
    end=min(len(out),idx+n); out[idx:end]+=sig[:end-idx]
def pad(freqs,start,dur,vel=0.08):
    n=int(SR*dur); idx=int(SR*start); t=np.arange(n)/SR
    env=np.minimum(1,t/1.5)*np.minimum(1,(dur-t)/1.5)
    sig=sum(np.sin(2*np.pi*f*t+0.3*np.sin(2*np.pi*0.2*t)) for f in freqs)
    end=min(len(out),idx+n); out[idx:end]+=(sig*env*vel)[:end-idx]
def f(m): return 440*2**((m-69)/12)
# Key: Eb major. Chords (MIDI): Eb(63) Bb/D(62) Cm(60) Ab(56)... progression I - V/vii - vi - IV, then ii - V - I - I
prog=[[51,58,63,67],[50,58,62,65],[48,55,60,63],[44,51,56,60],
      [53,60,65,68],[46,53,58,62],[51,58,63,67],[51,58,63,70]]
bar=4*beat
melody_pat=[[7,5,3,5,7,5,3,5],[7,5,2,5,7,5,2,5],[7,5,3,5,7,5,3,5],[7,5,3,5,7,5,3,5]]
pos=0.0; i=0
while pos<TOTAL-2:
    ch=prog[i%len(prog)]
    pad([f(ch[1]),f(ch[2]),f(ch[3])],pos,bar+0.5,0.05)
    note(f(ch[0]),pos,3.5,0.5,0.6)                 # bass root
    # arpeggio eighths
    order=[1,2,3,2,1,2,3,2]
    for k in range(8):
        note(f(ch[order[k]]+12),pos+k*beat/2,1.6,0.32 if k%4==0 else 0.22,1.0)
    # top melody note on beats 1 and 3
    note(f(ch[3]+12 if i%2==0 else ch[2]+12),pos+0.0,2.5,0.3,1.2)
    note(f(ch[2]+12 if i%2==0 else ch[3]+12),pos+2*beat,2.5,0.25,1.2)
    pos+=bar; i+=1
# simple reverb: feedback comb delays
def reverb(x):
    y=x.copy()
    for d,g in [(0.031,0.35),(0.047,0.3),(0.073,0.25),(0.11,0.2)]:
        n=int(SR*d); z=np.zeros_like(x); z[n:]=x[:-n]*g; y+=z
    return y
out=reverb(out)
# fade in/out and master
fade=np.ones_like(out); nf=int(SR*1.5); fade[:nf]=np.linspace(0,1,nf); nfo=int(SR*4); fade[-nfo:]=np.linspace(1,0,nfo)
out=out*fade
out=out/np.max(np.abs(out))*0.6
# soft lowpass via simple moving average
k=np.ones(6)/6; out=np.convolve(out,k,mode='same')
stereo=np.stack([out,np.roll(out,int(SR*0.0006))],axis=1)
pcm=(stereo*32767).astype(np.int16)
w=wave.open('music.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes()); w.close()
print('ok')

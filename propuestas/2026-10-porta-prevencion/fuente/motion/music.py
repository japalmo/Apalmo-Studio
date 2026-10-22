# Pista sintetizada tranquila (pad + pulso suave + arpegio) para los videos PORTA.
# Uso: python3 music.py <duración_s> <salida.wav> [bpm]
import numpy as np, wave, sys
SR=44100; TOTAL=float(sys.argv[1]); OUT=sys.argv[2]; BPM=float(sys.argv[3]) if len(sys.argv)>3 else 92; beat=60/BPM
out=np.zeros(int(SR*TOTAL))
def f(m): return 440*2**((m-69)/12)
def add(sig,start):
    i=int(SR*start)
    if i>=len(out): return
    e=min(len(out),i+len(sig)); out[i:e]+=sig[:e-i]
def pluck(freq,start,dur,vel):
    t=np.arange(int(SR*dur))/SR
    env=np.exp(-t*4.0)*(1-np.exp(-t*300))
    sig=np.sin(2*np.pi*freq*t)+0.25*np.sin(2*np.pi*2*freq*t)+0.08*np.sin(2*np.pi*3*freq*t)
    add(sig*env*vel,start)
def bass(freq,start,dur,vel):
    t=np.arange(int(SR*dur))/SR
    env=np.minimum(1,t/0.02)*np.exp(-t*1.2)
    add((np.sin(2*np.pi*freq*t)+0.2*np.sin(2*np.pi*2*freq*t))*env*vel,start)
def pad(freqs,start,dur,vel):
    t=np.arange(int(SR*dur))/SR
    env=np.minimum(1,t/1.2)*np.minimum(1,(dur-t)/1.2)
    sig=sum(np.sin(2*np.pi*fr*t+0.4*np.sin(2*np.pi*0.25*t))+0.5*np.sin(2*np.pi*fr*1.003*t) for fr in freqs)
    add(sig*env*vel,start)
# C - Am - F - G (I vi IV V), voicings
prog=[[48,60,64,67],[45,57,60,64],[41,57,60,65],[43,55,59,62]]
bar=4*beat; pos=0.0; i=0
while pos<TOTAL:
    ch=prog[i%4]
    pad([f(n) for n in ch[1:]],pos,bar+1.0,0.045)
    bass(f(ch[0]),pos,bar,0.35); bass(f(ch[0]),pos+2*beat,2*beat,0.22)
    if pos>2.5:  # arpegio entra después de la intro
        order=[1,2,3,2,3,2,1,2]
        for k in range(8): pluck(f(ch[order[k]]+12),pos+k*beat/2,0.9,0.16 if k%2 else 0.22)
    pos+=bar; i+=1
# reverb simple
y=out.copy()
for d,g in [(0.029,0.35),(0.053,0.28),(0.079,0.22),(0.12,0.16),(0.17,0.1)]:
    n=int(SR*d); z=np.zeros_like(out); z[n:]=out[:-n]*g; y+=z
out=np.convolve(y,np.ones(5)/5,mode='same')
fade=np.ones_like(out); nf=int(SR*2); fade[:nf]=np.linspace(0,1,nf); nfo=int(SR*4); fade[-nfo:]=np.linspace(1,0,nfo)
out=out*fade; out=out/np.max(np.abs(out))*0.55
st=np.stack([out,np.roll(out,int(SR*0.0007))],axis=1)
w=wave.open(OUT,'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype(np.int16).tobytes()); w.close()
print('ok')

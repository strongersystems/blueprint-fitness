import json,time,urllib.request,sys
ST={'south-woodford':(51.594893,0.036263),'leytonstone':(51.563245,0.009025),'hackney':(51.547289,-0.050239)}
O={
'south-woodford':[('South Woodford station','st',51.59174,0.02786),('Woodford station','st',51.60777,0.03682),('Snaresbrook station','st',51.58094,0.02148),('Redbridge station','st',51.57586,0.04584),
  ('Woodford Green','area',51.6094,0.0228),('Wanstead','area',51.5762,0.0270),('Woodford Bridge','area',51.6080,0.0560),('Walthamstow Central','area',51.5829,-0.0197)],
'leytonstone':[('Leytonstone High Road station','st',51.56368,0.00820),('Leytonstone station','st',51.5683,0.0083),('Leyton station','st',51.55650,-0.00558),('Wanstead station','st',51.5756,0.0287),
  ('Forest Gate','area',51.5494,0.0244),('Walthamstow Central','area',51.5829,-0.0197),('Stratford','area',51.5416,-0.0034),('Wanstead','area',51.5762,0.0270)],
'hackney':[('Hackney Central station','st',51.54714,-0.05678),('Homerton station','st',51.54708,-0.04312),('Hackney Downs station','st',51.54867,-0.06036),('London Fields station','st',51.54105,-0.05777),('Hackney Wick station','st',51.54344,-0.02415),
  ('Victoria Park','area',51.5372,-0.0412),('Clapton Pond','area',51.5554,-0.0478),('Dalston Junction','area',51.5461,-0.0753)],
}
def r(prof,a,b):
    u=f"https://routing.openstreetmap.de/routed-{prof}/route/v1/{prof}/{a[1]},{a[0]};{b[1]},{b[0]}?overview=false"
    for i in range(3):
        try:
            d=json.load(urllib.request.urlopen(u,timeout=25)); x=d['routes'][0]; return round(x['duration']/60,1), round(x['distance']/1000,2), round(d['waypoints'][0]['distance'])
        except Exception as e: time.sleep(2)
    return None
res={}
for s,dst in ST.items():
    res[s]=[]
    for name,kind,la,lo in O[s]:
        w=r('foot',(la,lo),dst); b=r('bike',(la,lo),dst); c=r('car',(la,lo),dst)
        res[s].append({'from':name,'kind':kind,'walk':w,'bike':b,'car':c})
        print(s,'|',name,'| walk',w,'| bike',b,'| car',c); time.sleep(0.3)
json.dump(res,open(sys.argv[1],'w'),indent=1)

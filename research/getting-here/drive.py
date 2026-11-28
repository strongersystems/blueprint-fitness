"""Drive times to South Woodford (OpenStreetMap car routes). 28 Nov 2026 run, minutes free-flow:
Woodford Green 5.7, Wanstead 5.3, Buckhurst Hill 7.2, Chigwell 7.2, Woodford Bridge 5.2, Gants Hill 5.0, Snaresbrook 5.1, Walthamstow 10.5.
Published = ceil(free-flow x 1.5): the router assumes empty roads."""
import json, math, urllib.request
DST = (51.594893, 0.036263)
O = [('Woodford Green', 51.6094, 0.0228), ('Wanstead', 51.5762, 0.0270), ('Buckhurst Hill', 51.6265, 0.0469), ('Chigwell', 51.6177, 0.0757)]
for n, la, lo in O:
    u = f"https://routing.openstreetmap.de/routed-car/route/v1/driving/{lo},{la};{DST[1]},{DST[0]}?overview=false"
    d = json.load(urllib.request.urlopen(u, timeout=25))['routes'][0]['duration'] / 60
    print(f"{n:16} {d:5.1f} free-flow -> {math.ceil(d * 1.5)} min")

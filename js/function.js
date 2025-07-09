function CalcExpNeed(x){
    return 100*x
}
function CalcAttribute(){
    player.health=n(0)
    player.attack=n(0)
    player.defence=n(0)
    for(let i=0;i<player.weapon.length;i++){
        if(player.weapon[i]==-1){
            continue
        }
        player.health=player.health.add(player.weapon[i].health)
        player.attack=player.attack.add(player.weapon[i].attack)
        player.defence=player.defence.add(player.weapon[i].defence)
    }
}
function SummonWeapon(){
    if(player.newWeapon!=-1){
        Sell()
    }
    let x=weaponLevelList[player.ironLevel]
    let r=random()
    let quality=0,wh=Math.floor(random()*8)
    for(let i=0;i<x.length;i++){
        if(r<=x[i][1]){
            quality=x[i][0]
        }
    }
    let base=n(player.level).mul(n(1.5).pow(quality)).mul(random()*0.4+0.8)
    let health=base.mul(10).mul(random()*0.1+0.95)
    let attack=base.mul(random()*0.1+0.95)
    let defence=base.mul(random()*0.1+0.95)
    player.newWeapon={quality:quality,part:wh,level:player.level,health:health,attack:attack,defence:defence}
}
function Sell(){
    player.newWeapon=-1
    player.money=player.money.add(100)
    player.exp+=10
}
function Change(){
    let t=player.newWeapon
    player.newWeapon=player.weapon[t.part]
    player.weapon[t.part]=t
    if(player.newWeapon!=-1){
        Sell()
    }
}
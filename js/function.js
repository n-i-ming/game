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
    player.power=player.attack.add(player.defence).mul(10).add(player.health).mul(n(1).add(player.againRate))
    .mul(n(1).add(player.criticalRate)).mul(n(1).add(player.backRate)).mul(n(1).add(player.antiAgainRate))
    .mul(n(1).add(player.antiCriticalRate)).mul(n(1).add(player.antiBackRate))
}
function SummonWeapon(){
    if(player.newWeapon!=-1){
        Sell()
    }
    player.makeCoolDown=5
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
    let attack=base.mul(0.9).mul(random()*0.1+0.95)
    let defence=base.mul(0.75).mul(random()*0.1+0.95)
    player.newWeapon={quality:quality,part:wh,level:player.level,health:health,attack:attack,defence:defence}
}
function Sell(){
    logs.push("你卖出一件"+weaponQualityList[player.newWeapon.quality]+"品质的装备 , 获得"+format(n(100).mul(n(2).pow(player.newWeapon.quality)))
    +"金币和"+format(n(10).mul(n(2).pow(player.newWeapon.quality)))+"经验")
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
function LoadIronLogs(){
    for(let i=weaponLevelList[player.ironLevel].length-1;i>=0;i--){
        logs.push(weaponQualityList[weaponLevelList[player.ironLevel][i][0]]+" : "
            +format((weaponLevelList[player.ironLevel][i][1]-((i==weaponLevelList[player.ironLevel].length-1)?0:weaponLevelList[player.ironLevel][i+1][1]))*100,1)+"%")
    }
    logs.push("当前等级铁砧获得不同品质装备概率如下")
}
function UpgradeIron(){
    player.money=player.money.sub(weaponLevelCost[player.ironLevel])
    player.ironLevel+=1
}
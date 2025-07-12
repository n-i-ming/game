function CalcExpNeed(x){
    return 100*x
}
function CalcAttribute(){
    player.health=n(0)
    player.attack=n(0)
    player.defence=n(0)
    player.speed=n(0)
    for(let i=0;i<player.weapon.length;i++){
        if(player.weapon[i]==-1){
            continue
        }
        player.health=player.health.add(player.weapon[i].health)
        player.attack=player.attack.add(player.weapon[i].attack)
        player.defence=player.defence.add(player.weapon[i].defence)
        player.speed=player.speed.add(player.weapon[i].speed)
    }
    player.power=player.attack.add(player.defence).add(player.speed).mul(2).mul(10).add(player.health).mul(n(1).add(player.againRate))
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
    let speed=base.mul(0.45).mul(random()*0.1+0.95)
    player.newWeapon={quality:quality,part:wh,level:player.level,health:health,attack:attack,defence:defence,speed:speed}
}
function Sell(){
    if(player.newWeapon==-1)return
    logs.push("你卖出一件"+weaponQualityList[player.newWeapon.quality]+"品质的装备 , 获得"+format(n(100).mul(n(2).pow(player.newWeapon.quality)))
    +"金币和"+format(n(10).mul(n(2).pow(player.newWeapon.quality)))+"经验")
    player.newWeapon=-1
    player.money=player.money.add(100)
    player.exp+=10
}
function Change(){
    if(player.newWeapon==-1)return
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
function EnterFight(){
    player.healthNow=player.health
    animationList=[]
    damageDrawList=[]
    let base=n(5).mul(n(player.fightLevel).pow(1.2))
    enemy.health=base.mul(10)
    enemy.attack=base
    enemy.defence=base.mul(0.8)
    enemy.speed=base.mul(0.5)
    enemy.healthNow=enemy.health
    round=1
}
function DealFight(){
    if(player.inFight==false)return
    if(animationList.length!=0)return
    if(enemy.healthNow.lte(0)){
        player.inFight=false
        player.fightLevel+=1
        logs.push("战斗成功")
        return
    }
    if(player.healthNow.lte(0)){
        player.inFight=false
        logs.push("战斗失败")
        return
    }
    if((player.speed.gte(enemy.speed) && round%2==1) || (player.speed.lt(enemy.speed) && round%2==0)){
        animationList.push({time:0,timeMax:1,type:"left"})
    }
    else{
        animationList.push({time:0,timeMax:1,type:"right"})
    }
}
function MoveFight(dif){
    for(let i=0;i<animationList.length;i++){
        animationList[i].time=Math.min(animationList[i].time+dif,animationList[i].timeMax)
        if(animationList[i].time==animationList[i].timeMax){
            if(animationList[i].type=="left"){
                let damage=player.attack.mul(random()*0.1+0.95).sub(enemy.defence.mul(random()*0.1+0.95)).max(0)
                enemy.healthNow=enemy.healthNow.sub(damage).max(0)
                logs.push("你 对 怪物 造成了 <text style='color:red'>"+format(damage,1)+"</text> 点伤害")
            }
            else{
                let damage=enemy.attack.mul(random()*0.1+0.95).sub(player.defence.mul(random()*0.1+0.95)).max(0)
                player.healthNow=player.healthNow.sub(damage).max(0)
                logs.push("怪物 对 你 造成了 <text style='color:red'>"+format(damage,1)+"</text> 点伤害")
            }
            animationList.splice(i,1)
            i--
        }
    }
    if(animationList.length==0){
        round++
    }
}
function DrawFight(){
    if(player.inFight==false)return
    let str=""
    let x=document.getElementById("mycanvas").getBoundingClientRect().left
    let y=document.getElementById("mycanvas").getBoundingClientRect().top
    let X=document.getElementById("mycanvas").getBoundingClientRect().right
    let Y=document.getElementById("mycanvas").getBoundingClientRect().bottom
    str+=`<div style='position:absolute;left:${x+25}px;top:${y+50}px'>玩家</div>`
    str+=`<div style='width:${player.healthNow.div(player.health).mul(250)}px;height:14px;background-color:red;position:absolute;left:${x+25}px;top:${y+73}px'></div>`
    str+=`<div style='width:250px;height:14px;position:absolute;left:${x+25}px;top:${y+71}px'>${format(player.healthNow,0)+"/"+format(player.health,0)}</div>`
    str+=`<div style='width:50px;height:50px;border:5px solid black;border-radius:50px;position:absolute;left:${x+150}px;top:${y+150}px'></div>`
    str+=`<div style='position:absolute;left:${X-55}px;top:${y+50}px'>怪物</div>`
    str+=`<div style='width:${enemy.healthNow.div(enemy.health).mul(250)}px;height:14px;background-color:red;
    position:absolute;left:${X-23-enemy.healthNow.div(enemy.health).mul(250).toNumber()}px;top:${y+73}px'></div>`
    str+=`<div style='width:250px;height:14px;position:absolute;left:${X-273}px;top:${y+71}px'>${format(enemy.healthNow,0)+"/"+format(enemy.health,0)}</div>`
    str+=`<div style='width:50px;height:50px;border:5px solid black;border-radius:50px;position:absolute;left:${X-200}px;top:${y+150}px'></div>`
    for(let i=0;i<animationList.length;i++){
        if(animationList[i].type=="left"){
            str+=`<div style='width:10px;height:10px;background-color:black;border-radius:5px;position:absolute;
            left:${x+215+(X-280-x-150)*(animationList[i].time/animationList[i].timeMax)}px;top:${y+175}px'></div>`
        }
        else{
            str+=`<div style='width:10px;height:10px;background-color:black;border-radius:5px;position:absolute;
            left:${X-220-(X-280-x-150)*(animationList[i].time/animationList[i].timeMax)}px;top:${y+175}px'></div>`
        }
    }
    return str
}
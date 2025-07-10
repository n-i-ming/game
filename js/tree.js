var keys={
    a:false,b:false,c:false,d:false,e:false,f:false,g:false,
    h:false,i:false,j:false,k:false,l:false,m:false,n:false,
    o:false,p:false,q:false,r:false,s:false,t:false,
    u:false,v:false,w:false,x:false,y:false,z:false,
    space: false,shift:false,
}
var strstrstr="abcdefghijklmnopqrstuvwxyz"
var charToNum={"a":65,"b":66,"c":67,"d":68,"e":69,"f":70,"g":71,
    "h":72,"i":73,"j":74,"k":75,"l":76,"m":77,"n":78,
    "o":79,"p":80,"q":81,"r":82,"s":83,"t":84,
    "u":85,"v":86,"w":87,"x":88,"y":89,"z":90}
function keydown(event) {
    if(event.keyCode==16){
        keys["shift"]=true;
    }
    else if(event.keyCode==32){
        keys["space"]=true;
    }
    else if(event.keyCode>=65 && event.keyCode<=90){
        keys[strstrstr[event.keyCode-65]]=true
    }
}
function keyup(event){
    if(event.keyCode==16){
        keys["shift"]=false;
    }
    else if(event.keyCode==32){
        keys["space"]=false;
    }
    else if(event.keyCode>=65 && event.keyCode<=90){
        keys[strstrstr[event.keyCode-65]]=false
    }
}
function random() {
    player.seed1 >>>= 0; player.seed2 >>>= 0; player.seed3 >>>= 0; player.seed4 >>>= 0;
    let cast32 = (player.seed1 + player.seed2) | 0;
    player.seed1 = player.seed2 ^ player.seed2 >>> 9;
    player.seed2 = player.seed3 + (player.seed3 << 3) | 0;
    player.seed3 = (player.seed3 << 21 | player.seed3 >>> 11);
    player.seed4 = player.seed4 + 1 | 0;
    cast32 = cast32 + player.seed4 | 0;
    player.seed3 = player.seed3 + cast32 | 0;
    return (cast32 >>> 0) / 4294967296;
}
addLayer("tree-tab",{
    update(diff){
        //update fix
        document.getElementById("outer")["style"]["background-color"]="rgba(0,0,0,"+player.themeId*0.1+")"
        if(document.getElementsByClassName("upgTable")[0]===undefined && document.getElementsByClassName("upgTable")[0]===null){

        }
        else{
            document.getElementById("text")["style"]["left"]=(document.getElementsByClassName("upgTable")[0].getBoundingClientRect().width-document.getElementById("text").getBoundingClientRect().width)/2+"px"
        }
        if(player.tmtmtm==0){
            player.tmtmtm=Date.now()/1e3
        }
        player.devSpeed=1
        let dif=(Date.now()/1e3-player.tmtmtm)
        // dif*=100
        while(player.exp>=CalcExpNeed(player.level)){
            player.exp-=CalcExpNeed(player.level)
            player.level+=1
        }
        player.makeCoolDown=Math.max(0,player.makeCoolDown-dif)
        CalcAttribute()
        player.tmtmtm=Date.now()/1e3
        dif=Math.min(dif,8*3600)
    },
    tabFormat:[
        "blank",
        "blank",
        ["display-text",function(){
            let str=""
            str+="<table><tr>"
            for(let i=0;i<subTabList.length;i++){
                if(subTabList[i]=="换行"){
                    str+="</tr><tr>"
                }
                else{
                    str+="<td><button "+(i>0&&(subTabList[i-1]!="换行")?"style='margin-left:-10px'":"")+" onclick='player.nowBigTab="+'"'+subTabList[i]+'"'+";player.fightSub=0'>"+subTabList[i]+"</button></td>"
                }
            }
            str+="</tr></table>"
            return str
        }],
        "blank",
        ["display-text",function(){
            let str=""
            if(player.nowBigTab=='属性'){
                str+="<div style='width:50px;height:50px;border-radius:50px;border:5px solid black'></div><br>"
                str+="<table>"
                str+="<tr><td style='text-align:left;width:60px'>等级</td><td style='text-align:left;width:200px'>"+format(player.level,0)+"</td></tr>"
                str+="<tr><td style='text-align:left;width:60px'>经验</td><td style='text-align:left;width:200px'>"+format(player.exp,0)+"/"+format(CalcExpNeed(player.level),0)+"</td></tr>"
                str+="<tr><td style='text-align:left;width:60px'>金钱</td><td style='text-align:left;width:200px'>"+format(player.money,0)+"</td></tr>"
                str+="<tr><td style='text-align:left;width:60px'>战力</td><td style='text-align:left;width:200px'>"+format(player.power,0)+"</td></tr>"
                str+="<tr><td style='text-align:left;width:60px'>生命</td><td style='text-align:left;width:200px'>"+format(player.health,0)+"</td></tr>"
                str+="<tr><td style='text-align:left;width:60px'>攻击</td><td style='text-align:left;width:200px'>"+format(player.attack,0)+"</td></tr>"
                str+="<tr><td style='text-align:left;width:60px'>防御</td><td style='text-align:left;width:200px'>"+format(player.defence,0)+"</td></tr>"
                str+="</table>"
            }
            else if(player.nowBigTab=="装备"){
                str+="铁砧 等级"+(player.ironLevel+1)+` <button onclick="LoadIronLogs()">?</button><br>
                <br><button ${player.money.gte(weaponLevelCost[player.ironLevel])?"":"disabled"} onclick='UpgradeIron()'>升级</button> 下一级需要金币 ${format(weaponLevelCost[player.ironLevel])}<br><br><button ${player.makeCoolDown==0?'':'disabled'} onclick='SummonWeapon()'>锻造</button> 冷却 
                ${format(player.makeCoolDown,0)}s<br><br>`
                str+="<table>"
                str+="<tr>"
                for(let i=0;i<4;i++){
                    str+=`<td><div onclick='nowChosenWeapon=${i}'style='width:50px;height:50px;border:3px solid 
                    ${player.weapon[i]==-1?"black":weaponBorderList[player.weapon[i].quality]};display:grid;place-items:center;'>
                    ${player.weapon[i]==-1?"空":weaponNameList[i]+"<br>"+player.weapon[i].level}</div></td>`
                }
                str+="</tr>"
                str+="<tr>"
                for(let i=4;i<8;i++){
                    str+=`<td><div onclick='nowChosenWeapon=${i}'style='width:50px;height:50px;border:3px solid 
                    ${player.weapon[i]==-1?"black":weaponBorderList[player.weapon[i].quality]};display:grid;place-items:center;'>
                    ${player.weapon[i]==-1?"空":weaponNameList[i]+"<br>"+player.weapon[i].level}</div></td>`
                }
                str+="</tr>"
                str+="</table>"
                str+="<br>"
                str+="<br>"
                str+="<table>"
                str+="<tr>"
                if(player.newWeapon!=-1){
                    nowChosenWeapon=player.newWeapon.part
                }
                str+=`<td><div style='width:150px;height:200px;border:3px solid 
                ${(nowChosenWeapon==-1 || player.weapon[nowChosenWeapon]==-1)?"black":weaponBorderList[player.weapon[nowChosenWeapon].quality]};padding-left:5px;padding-top:5px;text-align:left'>
                ${(nowChosenWeapon==-1 || player.weapon[nowChosenWeapon]==-1)?"空":
                weaponQualityList[player.weapon[nowChosenWeapon].quality]+weaponNameList[player.weapon[nowChosenWeapon].part]+" 等级"+player.weapon[nowChosenWeapon].level+"<br><br>"
                +"生命+"+format(player.weapon[nowChosenWeapon].health,1)+"<br>"
                +"攻击+"+format(player.weapon[nowChosenWeapon].attack,1)+"<br>"
                +"防御+"+format(player.weapon[nowChosenWeapon].defence,1)+"<br>"}</div></td>`
                str+=`<td><div style='width:150px;height:200px;border:3px solid 
                ${(player.newWeapon==-1)?"black":weaponBorderList[player.newWeapon.quality]};padding-left:5px;padding-top:5px;text-align:left'>
                ${(player.newWeapon==-1)?"空":
                weaponQualityList[player.newWeapon.quality]+weaponNameList[player.newWeapon.part]+" 等级"+player.newWeapon.level+"<br><br>"
                +"生命+"+format(player.newWeapon.health,1)+"<br>"
                +"攻击+"+format(player.newWeapon.attack,1)+"<br>"
                +"防御+"+format(player.newWeapon.defence,1)+"<br>"}</div></td>`
                str+="</tr>"
                str+="</table>"
                str+="<br>"
                str+="<table>"
                str+="<tr>"
                str+="<td><button onclick='Change()'>替换</button></td>"
                str+="<td><button onclick='Sell()'>卖出</button></td>"
                str+="</tr>"
                str+="</table>"
            }
            else if(player.nowBigTab=='关卡'){
                str+="第 "+player.fightLevel+" 关"
                if(player.inFight==false){
                    str+="<br><br><button onclick='player.inFight=true'>挑战</button>"
                }
                else{
                    str+="<table>"
                    str+="</table>"
                    str+="<br><br><button onclick='player.inFight=false'>退出</button>"
                }
            }
            return str
        }],
        "blank",
        "blank",
        ["display-text",function(){
            let str=""
            str+="<div style='padding-left:10px;padding-top:10px;text-align:left;height:400px;width:600px;border:2px solid black;overflow:auto'>"
            for(let i=logs.length-1;i>=Math.max(0,logs.length-100);i--){
                str+=logs[i]
                str+="<br>"
            }
            str+="</div>"
            return str
        }]
    ],
    previousTab: "",
    leftTab: true,
})
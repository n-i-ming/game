var logs=[]
var nowChosenWeapon=-1
function addedPlayerData() { return {
    themeId:0,tmtmtm:0,
    seed1:Math.floor(Math.random()*4294967296),seed2:Math.floor(Math.random()*4294967296),
    seed3:Math.floor(Math.random()*4294967296),seed4:Math.floor(Math.random()*4294967296),
    nowBigTab:"属性",
    level:1,exp:0,money:n(0),
    attack:n(0),defence:n(0),health:n(0),againRate:n(0),criticalRate:n(0),backRate:n(0),
    antiAgainRate:n(0),antiCriticalRate:n(0),antiBackRate:n(0),
    num:n(0),weapon:[-1,-1,-1,-1,-1,-1,-1,-1],newWeapon:-1,
    ironLevel:0,
}}

const weaponNameList=["武器","衣服","裤子","长靴","护手","护腿","戒指","项链"]
const weaponQualityList=["破败","普通","优秀","精良","史诗","传说","神话"]
const weaponBorderList=["grey","white","lime","blue","purple","gold","red"]
const weaponLevelList=[
    [[0,1],[1,0.1]],
    [[0,1],[1,0.25]],
]
const subTabList=[
    "属性","装备"
]
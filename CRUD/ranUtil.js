// 내용 랜덤 가져오기 
// 브라우져 크로스오리진 플러그인 필요(요건 임시방편용)
const contents = [];
function getContents(pPage){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','https://www.ddit.or.kr/review?page=1',false);  //일단 일부러 동기처리
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200){
            let schRegExp = new RegExp('<p class="review_con">.*</p>','g');
            let schRslt = xhr.responseText.match(schRegExp);
            for(let i=0; i<schRslt.length; i++){
                contents.push(schRslt[i].replace('<p class="review_con">',"").replace("</p>",""));
            }
           // console.log(contents);
        }
    }
    xhr.send();
}

(function(){
    for(let i=1;i<=12;i++){
        getContents(i);
    }
})();

// 타이틀 랜덤 가져오기 위해,벅스 실시간 노래 제목 가져옴(100개)
// 브라우져 크로스오리진 플러그인 필요(요건 임시방편용)
const titles = [];
(function(){
    var xhr = new XMLHttpRequest();
    xhr.open("get","https://music.bugs.co.kr/chart",false);  // 일부러 동기처리, 시퀀스 가독성
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            let schRegExp = new RegExp('disc_id="1" title="(.*)"',"g");
            schRslt =  xhr.responseText.match(schRegExp); // 100개
            for(let i=0; i<schRslt.length; i++){
                let onlyTitle = schRslt[i].split('"1" ')[1].split("=")[1].split(" buy")[0]; 
                onlyTitle = onlyTitle.substr(1,onlyTitle.length-2);
                //console.log(onlyTitle);
                titles.push(onlyTitle);
            }
        }
    }
    xhr.send();
})();

// 한국 성씨
const korFamNames = [
    "가","간","갈","감","강","강전","개","견","경","계","고","곡","공","곽","관","교","구","국","군",
    "궁","궉","권","근","금","기","길","김","나","난","남","남궁","낭","내","노","뇌","누","다","단",
    "담","당","대","도","독","독고","돈","동","동방","두","등","등정","라","란","랑","려","로","뢰","류",
    "리","림","마","만","망절","매","맹","명","모","목","묘","무","무본","묵","문","미","민","박","반",
    "방","배","백","번","범","변","보","복","봉","부","비","빈","빙","사","사공","산","삼","상","서",
    "서문","석","선","선우","설","섭","성","소","소봉","손","송","수","순","승","시","신","심","십",
    "아","안","애","야","양","어","어금","엄","여","연","염","엽","영","예","오","옥","온","옹","완",
    "왕","요","용","우","운","원","위","유","육","윤","은","음","이","인","임","자","잠","장","장곡",
    "저","전","점","정","제","제갈","조","종","좌","주","준","즙","증","지","진","차","창","채","천",
    "초","총","최","추","춘","쾌","탁","탄","탕","태","판","팽","편","평","포","표","풍","피","필",
    "하","학","한","함","해","허","혁","현","형","호","홍","화","환","황","황목","황보","후","흥"
];

// 한국 이름 (자주 쓰이는 이름 약 5천개 오버)
const korNames = [
    "민준","서준","도윤","예준","시우","하준","주원","지호","지후","준우","준서","건우","도현","현우",
    "지훈","우진","선우","서진","유준","연우","민재","현준","은우","정우","시윤","승우","승현","준혁",
    "지환","윤우","승민","유찬","지우","이준","민성","준영","시후","진우","수호","지원","수현","재윤",
    "시현","동현","태윤","이안","민규","한결","재원","민우","재민","은찬","윤호","시원","민찬","지안",
    "시온","성민","준호","승준","성현","현서","재현","하율","지한","우빈","태민","지성","예성","민호",
    "태현","지율","서우","민혁","은호","성준","규민","정민","준","지민","윤성","율","윤재","우주","하람",
    "하진","민석","준수","은성","태양","예찬","준희","도훈","하민","준성","건","지완","현수","승원","강민",
    "정현","태준","승호","주호","성빈","주안","민서","로운","도영","우현","민수","건희","주환","하랑",
    "다온","정훈","원준","시율","시훈","지오","민기","현민","시완","경민","서율","현성","승윤","주영",
    "동하","태훈","민건","도율","동건","이현","재훈","태영","호준","승빈","가온","재준","시환","이든",
    "세현","도하","태경","도원","도경","서후","정후","현진","재영","라온","정원","현승","찬영","영준",
    "상현","범준","윤","온유","승훈","성윤","현","재하","주혁","찬우","연준","하윤","우성","동윤","성훈",
    "승재","찬희","지혁","건호","세준","동욱","태율","수민","태호","유건","승찬","윤찬","단우","태우",
    "산","현호","윤후","현빈","시안","찬","재우","준석","지운","주현","형준","연호","효준","재혁","주한",
    "성우","규빈","주완","동우","하늘","수혁","재희","시헌","상윤","우찬","유빈","진호","유현","석현",
    "우영","준형","도연","윤서","유진","서원","지용","용준","규현","준후","동준","은율","도준","호진",
    "강현","태오","태인","진혁","상우","우준","은준","승후","시호","지웅","승환","은혁","동훈","유민",
    "하온","도겸","성원","도진","승주","대현","영민","서윤","종현","세훈","서호","현석","신우","재호",
    "준현","원우","강우","승유","상민","태환","은수","선호","준원","민결","정빈","동혁","영우","아인",
    "유안","동규","진서","태성","유성","혜성","요한","성진","여준","윤건","인우","태건","주형","우혁",
    "희찬","한율","하성","준범","찬민","서현","정호","윤수","민제","성호","인성","건후","경준","희준",
    "상준","승혁","재이","태원","준민","재율","민승","태웅","채민","승헌","한울","재성","시준","진영",
    "환희","선율","세윤","호연","승기","세진","성재","태하","주성","호영","가람","다원","찬율","현규",
    "규원","이한","연후","현욱","준하","시영","희성","진욱","정윤","지윤","창민","지온","지섭","해준",
    "정환","민","건율","은재","찬혁","동연","유하","노아","성찬","세민","서빈","우석","영훈","도형","준기",
    "윤준","지석","로이","인호","은후","명준","상훈","기현","수빈","재형","아준","해성","민후","진성",
    "주하","시언","시형","상원","태연","도건","재인","준휘","동민","한준","다니엘","기범","주헌","재용",
    "수환","원","태규","선재","영재","영진","주찬","지수","동호","우재","승범","동원","한별","건영","진",
    "승연","도헌","한솔","유담","예건","환","은결","민율","민욱","지헌","석준","준모","현재","결","강",
    "이수","재범","리안","찬유","재환","호윤","해솔","태희","건하","상혁","성욱","영찬","동환","준환",
    "진원","하빈","재욱","경훈","준상","서하","연수","하루","예담","수찬","강준","도균","태이","훈","형우",
    "승규","재빈","종혁","도운","근우","찬호","윤혁","유신","리우","범수","동주","혁준","찬빈","한빈",
    "태빈","창현","성주","혁","지현","이찬","유승","겸","은규","연재","희재","태완","수영","병준","동휘",
    "세영","태욱","의준","관우","성환","재연","재경","윤석","민영","대한","선준","지유","은석","지욱",
    "성연","경빈","정욱","솔","한서","보겸","인준","윤제","도빈","준용","규진","희원","다율","주언","영광",
    "성하","현중","종윤","형진","채훈","정혁","태형","준오","진수","승진","유겸","찬서","종민","영빈",
    "의찬","한","승하","종우","유환","희수","호성","태헌","채우","재헌","원재","석민","경원","승리","강희",
    "상욱","민형","민섭","용현","범진","준이","서안","명진","예훈","시혁","상진","영현","원석","승수",
    "우민","현태","도담","정연","이삭","형주","미르","대윤","로하","정인","용우","유호","태균","요셉",
    "건민","기훈","영웅","지홍","선후","종원","동후","태겸","종훈","유한","호","제민","준표","원빈","보성",
    "인서","동희","의진","준규","리한","혜준","재후","경호","진현","현도","찬솔","호현","다현","동균",
    "원호","재웅","세인","하겸","제이","민겸","진석","승욱","동근","다훈","동영","형민","기윤","대호",
    "지승","슬우","해찬","대영","강윤","서한","동진","진후","정진","윤상","영서","민균","재승","정준",
    "세찬","규태","민국","우림","경환","우솔","의현","대성","도엽","근호","효재","다민","효민","민철",
    "어진","준엽","예승","승언","하원","두현","성율","단","지형","채운","진형","대원","정수","시하","도은",
    "용진","주빈","제현","태진","범서","건형","해인","로건","민교","혁진","수인","슬찬","영호","하엘",
    "정운","세환","경현","태산","선민","아론","범","준섭","태후","은유","기찬","승엽","다빈","선규","태주",
    "기태","채환","제윤","무진","승완","정재","수안","진규","시유","현웅","용재","윤오","기준","수한",
    "태은","석훈","우리","석원","로빈","다엘","세원","채윤","원진","재아","규연","태혁","한빛","필립",
    "성혁","재완","제하","선빈","세빈","윤기","이레","인혁","주훈","광현","보민","도혁","재진","진하",
    "동빈","병찬","효성","성규","채준","승효","승한","시진","시운","원영","리호","강빈","강호","성운",
    "유석","채호","다겸","종호","채원","범석","이도","현종","성수","민하","도언","상연","건휘","석진",
    "건욱","한성","효원","믿음","도우","선웅","규호","태유","강산","도환","선유","형석","정헌","현기",
    "용민","태수","신","하담","희승","무성","리온","용훈","서훈","대훈","루이","이환","경태","동화","이담",
    "유근","강인","영후","찬휘","래원","채현","무빈","민근","희우","하음","민상","윤민","빈","현찬","휘",
    "경록","찬웅","담","지상","상호","서찬","루다","찬형","하영","효찬","희윤","영인","규성","정한","예현",
    "현율","지효","채완","상빈","사무엘","경찬","솔민","태서","서형","동율","은기","재홍","은총","승운",
    "윤환","서환","주용","용찬","진환","세연","누리","진율","기원","원희","인후","태강","준식","민권",
    "세호","재서","병현","윤빈","인수","호빈","세종","신후","효빈","서인","훤","우형","대연","태용","마루",
    "주윤","수완","보현","경모","영주","희건","장우","석우","강유","영석","정안","동해","휘성","동찬",
    "규범","선","호재","영환","유","상헌","현오","병훈","동은","용하","광민","인규","수","명재","인찬",
    "세웅","진모","도한","성은","중현","도완","대경","대환","리오","해민","민솔","민구","이솔","윤겸",
    "다윤","채율","인하","수오","경수","동완","찬욱","태온","태운","리환","승건","재석","재유","해온",
    "호민","용빈","연성","태한","도후","기주","다인","서혁","예강","홍준","지찬","대희","강훈","현후",
    "이건","레오","장현","호찬","이서","주연","진유","동헌","해원","시찬","종하","성후","근영","제원",
    "세혁","예한","태랑","무경","이루","준명","진웅","찬규","시연","은상","성모","현동","용호","원혁",
    "동엽","상후","대건","규환","지빈","루하","건웅","재겸","해윤","현제","호원","하운","휘준","석빈",
    "온","제우","규담","경진","기환","민환","세헌","치우","제훈","장원","서온","해담","현식","휘찬","예환",
    "동재","해진","창우","준아","준한","재휘","이헌","준재","기민","영욱","로한","진오","세율","강후",
    "석주","상율","윤형","하승","하울","권","명훈","한겸","창희","태림","찬이","도","성범","지범","세온",
    "서완","정찬","원찬","민식","동인","범규","준경","민용","영수","원규","규하","유노","창준","현섭",
    "하임","민종","강율","민범","도휘","리후","우경","현모","규영","상엽","은택","송현","윤하","승제",
    "가을","다운","형찬","혁주","석영","윤태","종찬","훈민","윤규","승휘","도유","재찬","형빈","우람",
    "석호","찬준","요엘","무겸","태범","희상","준빈","기성","은빈","다솔","사랑","준연","세하","진명",
    "다윗","형욱","용주","종빈","윤섭","진용","호수","소율","창빈","재익","수원","지태","해율","동운",
    "권우","재운","강혁","리원","기영","창훈","선욱","민중","재한","세한","성용","동한","윤승","종욱",
    "은섭","라윤","수하","종인","승희","승표","하언","화랑","준열","태휘","소망","하경","승용","민강",
    "민채","유섭","래현","정","라현","완","한음","한영","수겸","석환","형규","동률","이언","예율","윤슬",
    "연석","병우","규찬","준선","제영","우겸","수형","일우","민주","승율","제희","태정","진헌","병민",
    "다한","남규","라엘","태리","윤진","재상","찬수","정완","수연","진솔","운찬","주은","호경","건률",
    "경윤","로아","성제","지명","예안","준홍","은오","권율","지산","연서","태석","병윤","효승","별","유원",
    "가빈","이산","준승","보검","건이","건아","민진","용성","유상","범찬","병호","예온","운","명현","남우",
    "문성","규혁","헌","동권","주승","승오","병주","백호","효석","호승","주엽","남준","상범","유태","강찬",
    "승모","대겸","지언","유수","원율","승균","태언","성균","라율","희민","한선","예람","한주","무현",
    "수윤","정규","찬진","시욱","태섭","의성","희율","승철","민현","유완","현택","보석","태승","영운",
    "별하","종환","태근","이룸","지담","은겸","찬현","현채","정율","해든","보승","은서","문수","경률",
    "찬주","찬열","아성","한민","성일","현겸","바다","종연","신혁","안","로윤","동언","석찬","종범","무영",
    "호석","루빈","아민","다호","재오","병욱","후","하균","호건","기웅","신유","한희","형서","경우","민유",
    "설","은률","석희","보경","우승","에녹","진표","유주","수범","산하","승태","담우","경서","우연","태일",
    "하현","재은","주율","수성","아진","성헌","현근","건혁","동수","리현","준일","준태","효진","수훈",
    "한승","명규","아람","하림","상운","채성","성태","찬용","부건","병헌","제준","순우","찬후","민창",
    "우정","명호","예하","경욱","이겸","윤도","이재","현구","신율","다올","영하","루한","규헌","민관",
    "정효","나율","연욱","기백","준협","동유","형원","은솔","윤철","여름","든","수용","리건","라원","기호",
    "용수","상은","철민","휘서","재건","주명","영원","우섭","모건","도민","민오","근형","성한","정주",
    "주열","성","시열","태린","종석","예겸","우인","재정","래오","채빈","윤영","보근","윤식","해강","서언",
    "지인","준화","도일","채혁","용희","건오","태관","교빈","부겸","희제","세운","희태","명우","창윤",
    "인","시한","희서","진홍","진한","규한","대규","율찬","우제","기연","윤범","윤결","병규","용석","예호",
    "정범","승화","하선","장호","도아","명성","관호","노엘","기문","태권","연규","찬슬","명환","영윤",
    "승일","성엽","창호","루안","호림","장훈","세중","준헌","문규","정석","건준","재선","찬윤","주민",
    "서휘","힘찬","두영","정하","대웅","연승","오현","한이","용원","효근","세형","희철","정희","원기",
    "연오","윤솔","동국","종서","종수","정모","시오","푸름","종헌","수홍","유재","다준","동기","태곤",
    "준겸","장혁","선오","승택","한규","영제","영록","예서","승안","현일","단율","래온","리암","연제",
    "영","용환","성철","선진","병진","혜찬","성근","하은","진섭","남현","희범","경석","재권","정엽","라준",
    "서헌","수아","신욱","윤구","승열","해랑","주석","명수","기율","재엽","원형","명근","명찬","봄","담현",
    "유온","테오","재강","준구","나단","도희","순호","노을","하린","수헌","성웅","찬하","우용","종은",
    "범주","건일","원태","준의","명민","희도","예일","근후","률","제연","은표","소명","우담","호정","동관",
    "정웅","준교","한진","진희","부경","가율","설민","이원","영도","시경","현명","치원","경재","태선",
    "은제","동석","정무","무준","담율","용욱","은교","현희","도규","영기","해승","소울","현솔","유비",
    "원민","기우","휘영","상언","기쁨","예권","재효","인환","주오","서로","병건","남훈","환준","은환",
    "다성","연","상규","찬양","본준","도욱","도근","제호","재언","율호","두원","범희","주온","서범","재명",
    "세범","재근","기혁","백현","효건","석윤","우철","태홍","덕현","익현","치훈","혜민","선균","현철",
    "예섭","아윤","정근","무건","우","진훈","은민","철우","재열","영건","용화","인석","홍석","희망","현범",
    "명석","강한","신영","창욱","채범","오성","재중","치현","윤종","승","웅","영채","대은","상희","승겸",
    "충현","승영","혁민","현균","연찬","예닮","효인","기량","광호","이랑","학준","제아","경도","인영",
    "효섭","지음","원후","찬성","혁찬","서유","예원","송민","관영","윤채","민웅","문기","인태","제율",
    "규형","동명","이엘","상수","윤택","효우","영규","채헌","강은","정명","평안","기정","종건","수종",
    "한수","원서","룩","제혁","중원","이완","정태","서영","현담","설우","윤한","시아","정서","동아","의겸",
    "에이든","서웅","선혁","승권","종후","제성","요섭","용","세용","병철","서겸","연진","윤현","홍민",
    "명원","희주","정섭","창환","동성","솔찬","성문","기석","찬홍","명빈","유솔","도이","제형","선제",
    "치호","종진","다울","시웅","재림","승채","윤모","태화","태식","기용","시은","제후","강욱","재균",
    "성휘","인재","경한","아율","바울","용범","가원","재백","한비","승조","창수","주노","성록","하륜",
    "로원","루오","율빈","예범","범기","치윤","성완","지강","산희","우열","본우","지황","상유","강모",
    "예중","종운","영균","정흠","주상","은철","대혁","평강","석규","규동","호세","홍기","원일","진구",
    "성열","효상","제이든","상효","상명","선용","용운","형근","여민","상협","지영","도협","현교","은",
    "나엘","이강","용규","형호","가현","광희","택연","준언","경완","근혁","병수","한슬","지건","영범",
    "희섭","윤권","리완","경주","두연","모세","우원","반석","유강","승은","기완","준택","규완","은중",
    "은산","두리","규상","호근","서연","율하","종화","유범","기욱","강연","준학","창혁","건도","영성",
    "무결","다함","권희","요환","용휘","경인","승학","인철","규준","루아","부성","새벽","호용","교현",
    "용후","호율","건태","동경","영태","한유","종휘","관희","백준","이람","찬일","주경","율희","성언",
    "성희","다빛","은강","휘승","기헌","선홍","동일","호균","탄","예후","찬의","지훤","동섭","창진","소원",
    "상영","로현","유로","현용","윤원","종성","이룬","현상","교준","구현","문경","승구","윤중","준건",
    "준효","바론","제인","오윤","상화","우태","제욱","산들","남호","우창","경섭","나루","경율","무열",
    "예근","화평","정음","율민","중호","범근","주홍","준익","효제","은열","진언","원제","운호","민엽",
    "진휘","이정","에릭","예헌","경문","준율","우신","현덕","승록","그루","강휘","호인","건용","택현",
    "규석","태상","두호","강건","우상","건주","하주","지서","이선","현유","천우","석","인욱","우종","성국",
    "형섭","한얼","도권","성오","도호","상휘","하리","준완","명서","훈석","찬석","차민","현조","진운",
    "명균","성식","여찬","환이","세욱","욱","정균","찬울","종한","호겸","의재","현세","해수","은휼","진민",
    "앤드류","은식","강원","성인","경탁","리윤","하연","유인","효담","병관","의연","권호","동형","재규",
    "규선","한률","예석","병권","서경","휘원","현탁","건모","은효","루민","민태","태안","진건","율원",
    "보윤","서균","현영","정용","영일","혁수","성영","환호","다혁","인범","승근","성택","남윤","찬승",
    "효범","원섭","대용","기홍","휘윤","호선","호형","서담","산호","의석","형식","창연","명섭","채진",
    "예빈","경","국현","규인","라운","호태","가민","호중","윤근","유철","은범","이로","서주","창범","대헌",
    "준철","성효","이진","홍찬","건유","인겸","홍재","창규","솔빈","희","석범","서욱","보규","승온","승지",
    "동오","하솔","아현","무혁","산이","원종","채하","다건","원겸","성무","희권","진기","다움","희담",
    "성유","휘수","우수","환서","광훈","현이","라호","혁빈","단유","도열","지백","해일","훈희","나우",
    "민한","용기","영한","명철","호범","교진","상하","마음","의담","한경","유영","대진","예랑","효신",
    "혁재","지솔","재광","해리","휘건","선엽","찬식","의빈","서용","민세","영헌","휘재","대우","한중",
    "채영","남혁","성화","대휘","제환","이연","진태","재학","건빈","두진","희온","제헌","영권","정기",
    "경규","익준","주","조이","성률","기하","휘상","래윤","원경","라임","주우","의선","예종","해건","민선",
    "우린","현무","상","성권","규람","유림","유천","샘","규식","하건","유혁","태풍","재온","부민","재문",
    "다을","태종","효중","용태","루카","대율","초원","문찬","현선","연웅","도성","윤담","세완","상인",
    "상록","태광","선중","의영","시엘","찬오","현주","카이","원상","한샘","재화","상일","영조","광수",
    "원식","경헌","상재","주선","성안","유지","해밀","규림","재관","조슈아","차윤","종율","철현","관후",
    "규안","기담","로준","현건","현창","교민","문혁","인섭","푸른","의민","대운","원중","시울","나로",
    "중혁","여훈","류하","동효","동범","규서","원철","드림","무찬","승협","동겸","금성","경일","용대",
    "운성","희락","휘민","늘","두환","승관","리하","상철","여울","지구","의정","희창","건규","서홍","웅찬",
    "헌재","자윤","용건","순혁","원욱","온율","병재","찬원","경근","한길","솔우","휘연","상경","예윤",
    "홍주","우택","강률","철","창성","철호","명관","유일","호산","강석","리준","담희","문석","오름","랑",
    "호열","영철","세움","동열","성광","보람","치영","서희","종선","인기","순범","보담","찬범","성결",
    "성관","태령","유엘","경택","호담","명건","호은","비오","케빈","경운","형윤","승아","완희","한석",
    "은종","로희","해빈","희강","유권","명","영근","국","성종","제범","해람","규보","이음","강이","아빈",
    "창하","은태","찬기","문준","비","기동","형선","나라","세주","원용","형기","성겸","의윤","희웅","류현",
    "차율","기은","세강","제용","진교","권민","엘","희진","호철","하라","성경","광재","광진","대욱","택민",
    "조영","윤동","경덕","승교","대준","정식","건무","재안","의서","의환","희영","대수","은현","이우",
    "화준","세건","용선","경후","경식","견우","민택","근태","희석","두준","진겸","태검","홍빈","해환",
    "승인","순찬","나현","해영","제승","동협","라이언","승보","알렉스","라울","민조","수진","하유","대승",
    "평화","혜강","규언","휘경","인선","루호","창영","조은","루현","성건","상기","채욱","본","종명","성보",
    "용제","벤자민","조한","수웅","우식","창용","라일","은별","남기","회준","보건","수언","승목","재국",
    "채웅","준회","진효","영선","범호","소준","무율","정의","레","희중","원택","근원","경하","진온","헌우",
    "남경","자운","영승","종희","제경","호제","규승","준안","슬옹","건훈","진선","진완","건효","레이",
    "대균","브라이언","규남","성배","민훈","인율","우건","유우","효서","여원","병서","승렬","수열","정언",
    "륜","재동","규도","율건","로율","혁규","남율","수근","영탁","예완","효영","윤교","병국","규은","현보",
    "희훈","이율","창인","종규","상건","민홍","알렉산더","종완","대근","준근","루리","하서","선윤","창석",
    "대찬","재일","휘겸","경무","관용","상오","윤창","소민","조엘","자민","정택","인교","채건","루원",
    "제임스","대형","경은","현결","선주","기수","세경","준유","휘진","영래","승배","진권","기빈","권준",
    "순민","희겸","찬종","이훈","나무","명기","영상","단후","정오","성중","태찬","금","시민","바름","윤표",
    "채오","동익","이래","주진","효겸","연태","경목","경오","용은","영식","강운","희현","예인","석재","라함",
    "진재","한호","곤","상용","규온","유정","선명","택준","다헌","선하","윤학","유창","병희","선일","희동",
    "이호","성필","지광","레온","준세","태기","나준","재황","태효","대엽","서강","동선","승필","재령","해우",
    "영휘","설호","찬엽","찬별","영택","라훈","창주","근석","보빈","성지","주엘","은조","우선","강일","하이",
    "필준","두희","다일","서오","하다","규","진리","우중","은형","기승","라익","해","민효","학현","원하",
    "훈서","영대","아서","원주","경필","정제","권영","유래","대권","선종","준보","여명","나혁","장희","윤조",
    "다우","치후","구윤","홍규","민률","필규","운혁","재신","래호","정휘","철희","용연","하을","진엽","해서",
    "재덕","경범","욱진","유마","대인","병선","강진","용인","선휘","찬경","희운","룬","세담","슬기","병율",
    "신호","유은","영완","학윤","유훈","명주","아랑","백찬","보배","현윤","중기","중훈","겨울","자현","경철",
    "유종","경표","성표","채형","건수","조셉","해주","미루","근휘","록희","수창","기명","제웅","나훈","형록",
    "신원","찬중","철웅","예솔","정협","범식","명제","언","본율","병석","종엽","찬결","석형","치민","천희",
    "리율","승섭","도흔","승종","헌준","혜승","승비","하일","준웅","저스틴","빛","윌리엄","남주","도안","창근",
    "기륜","현묵","관형","기택","규희","현표","근희","서중","벼리","강재","세홍","진철","철환","데이빗","조운",
    "규백","홍서","린우","태의","자훈","은탁","하명","재담","영신","광명","정철","로훈","규열","규섭","노율",
    "민산","선교","초인","원정","진범","승석","주왕","루희","홍현","효종","병후","경남","준솔","아원","근하",
    "서백","택윤","유택","서정","정록","강륜","온우","성룡","근찬","한웅","지만","성온","준찬","중민","라언",
    "용한","나겸","래인","경배","웅빈","중한","늘찬","헨리","문영","태평","윤강","보준","성목","철수","세창",
    "이윤","람","리훈","두산","예우","제이슨","성구","대민","서린","병하","권률","로은","승룡","배성","성도",
    "경대","순율","경담","오준","그린","용혁","축복","영화","빛찬","근수","단희","현학","진관","민경","형철",
    "진협","의건","충만","대유","소담","제완","광휘","환성","린","유록","재의","재모","가헌","충민","선기",
    "혜율","인한","성익","휘담","강온","호서","종준","영오","지노","보영","홍진","채정","원균","대일","신형",
    "승익","영섭","규정","담호","주아","준행","은엽","종오","운서","이섭","보원","순후","현송","하","장환",
    "시명","성래","기서","성묵","기남","성렬","선형","기선","형택","송주","후성","보권","상권","희호","태구",
    "윤홍","의주","경연","희용","성아","종문","부현","희람","근민","회윤","휼","남건","순형","태익","겸희",
    "동렬","보명","장민","중우","유선","이석","창휘","한검","문호","신웅","은광","래이","인오","한열","창헌",
    "성흠","평온","재필","이룩","창엽","광원","두형","신현","아담","건화","상태","상균","태솔","에드워드",
    "경동","단하","나온","우일","채승","션","승곤","다진","루카스","태신","형태","홍윤","성학","다하","시몬",
    "대선","재륜","영은","혜원","율기","정목","오율","세휘","세일","광준","송윤","태중","천호","원근","새힘",
    "용헌","차빈","이혁","세광","하석","이영","이빈","종태","민설","웅재","순규","루니","광일","하록","우엽",
    "경래","용근","을","효주","은한","지흠","인택","경돈","우근","승서","일","선모","연택","윤산","정일",
    "현률","정건","민표","도명","치헌","두경","은진","수일","효윤","승래","록","회성","이경","유단","에반",
    "원표","광영","하론","구준","로휘","민휘","홍","본혁","겨운","세희","승명","한세","소유","지휼","재철",
    "창섭","원범","명선","형훈","용승","제이콥","보율","강수","정유","신재","송우","승률","정은","하훈","우서",
    "송준","나윤","세정","준제","예주","희종","효식","건엽","아섬","승형","성조","현배","용균","찬익","도결",
    "리언","민곤","라빈","범우","진식","경묵","정겸","인용","세명","경선","세은","유리","강헌","주담","차현",
    "은원","승회","선구","아일","일환","욱현","유휘","데이비드","찬재","관율","슬","보결","리찬","보선","소중",
    "대홍","완우","민희","크리스토퍼","범모","영율","들","관유","찬훈","율우","이주","상목","학민","호동","겸재",
    "근서","규화","예운","래훈","기열","경륜","형건","창대","우호","창재","범성","호령","성덕","현목","민광",
    "건명","성동","창은","라한","신희","회찬","지겸","으뜸","한들","무근","종국","상환","정래","율서","중건",
    "대양","래건","창건","보훈","병근","재섭","태량","로민","류진","이록","광빈","건윤","동철","삭","선효","류",
    "환진","노현","충호","지하","희로","선겸","규린","수우","대완","제빈","채움","예형","기상","승문","규래",
    "설빈","해창","동채","류빈","예루","재협","일성","은렬","기운","예도","환웅","의태","장군","권후","일준",
    "유연","사빈","현강","택훈","아로","주신","성채","건홍","인표","기진","검재","림","조안","정대","은창","원모",
    "기섭","한새","이제","윤관","형도","건국","신성","형균","탁","양우","라오","학영","하용","성곤","은학","주휘",
    "창선","병연","석인","형래","정온","재곤","준무","인주","윤일","재만","길현","형오","근모","태지","현원",
    "원교","현곤","세화","종근","구민","환유","항준","주훤","승도","대오","두성","일현","우탁","원이","의혁",
    "도웅","규탁","송원","하중","현인","혁우","담윤","교영","수철","덕규","정묵","백경","필","리엘","아셀","병은",
    "래언","헌수","한을","나원","남욱","신지","남영","연훈","찬흠","수율","매튜","대관","로안","루","웅비","기산",
    "형모","일훈","다안","조나단","유이","남진","산휘","부영","정문","창운","라건","정배","본승","정익","홍원",
    "규철","우희","진무","명윤","양현","지준","택진","민걸","의섭","용일","희근","현권","지함","두언","송하","보광",
    "지모","아루","가엘","일호","기창","선현","승휴","태흔","서림","영관","휘석","윤선","환주","제오","미래","해운",
    "송율","예신","필재","현국","광모","요안","희완","다감","문교","성기","후영","민열","응찬","덕환","희산","희열",
    "민도","기광","한혁","아온","광혁","산아","관현","충헌","영효","은세","하정","규택","종학","성협","형운","지엽",
    "리","슬민","학진","율언","세이","덕영","형중","주함","헌주","여호수아","광석","영동","훈기","주협","희정",
    "휘동","길우","경렬","원오","무원","재린","윤탁","진결","광윤","건찬","로","라혁","형수","순현","태람","상문",
    "서건","소호","은욱","윤주","민송","일수","상학","하우","유희","혜인","원휘","규훈","동구","갈렙","명인","광우",
    "세상","기철","찬구","마이클","남수","충원","원창","단호","동이","세언","경성","한설","기유","성신","록기",
    "소윤","행복","경용","인승","주광","동륜","진일","사윤","한휘","선률","락현","상완","기안","상찬","강주","금찬",
    "두혁","가윤","윤희","중근","제노","병휘","휘호","열","대산","명헌","성령","근욱","은도","휘주","찬연","리헌",
    "설현","새한","교범","태을","소훈","강규","휘근","규오","일한","본찬","지행","호종","장수","건재","명한","효수",
    "이온","규홍","시용","기탁","현익","선영","관휘","준배","세계","서은","창화","율이","지학","태왕","송빈","범한",
    "희연","주황","바른","혜담","단테","여진","효현","현휘","환석","명보","진경","시화","대중","승백","단태","현하",
    "하나","노윤","기덕","영국","리유","래준","천명","성천","연두","원률","제유","창완","교원","충희","선태","동학",
    "건령","백건","다휘","인아","덕호","재무","중서","선찬","윤헌","형율","지협","고건","우윤","혜상","인희","윤설",
    "청운","찬섭","세열","렌","원선","형은","해안","종권","태황","태열","한윤","완서","근오","문현","택","가운",
    "순","휘온","장운","오민","토마스","창일","가브리엘","인식","신의","순영","채강","류원","원익","송헌","인웅",
    "한용","제진","주화","윤보","인엽","대명","한동","명신","담원","대협","미준","래안","창균","무휼","보우","인제",
    "명하","광은","류건","록현","모아","다찬","태조","효명","휘율","명식","연중","범구","현두","예균","선근","금재",
    "웅기","루온","다형","다경","청명","관","영무","연종","새찬","서","종철","정표","운재","준걸","도해","정담",
    "형인","진윤","의인","강록","환영","영돈","도훤","대언","용섭","시흔","채후","예규","관민","유열","가준","영남",
    "현록","창기","대니","브랜든","채홍","태흠","동제","이훤","유야","이로운","인구","주인","권능","남일","라겸",
    "강하","승국","황","라하","경언","세나","원효","효","인권","경영","윤휘","순원","존","담후","해규","광성","창모",
    "채담","주희","근범","진산","현비","준욱","교윤","주역","승정","성복","용권","수명","호권","종영","윤익","혜윤",
    "영교","완호","남균","병화","담덕","조현","한범","기언","동식","영산","홍성","동길","훈성","태백","세림","산율",
    "재식","사야","운율","나건","아","기랑","정선","류민","영중","현경","범현","부승","찬명","태순","카일","준필",
    "유람","희랑","찬누리","세아","주학","덕훈","찬들","승덕","륜호","창원","려준","건중","은일","완규","율현","낙현",
    "치형","다환","재","상필","현의","한글","유섬","정필","본민","기표","래환","순재","세익","로울","성만","덕윤",
    "강서","민학","영지","대상","열음","명운","관욱","진택","원도","형탁","장준","상웅","정요","채한","의림","장윤",
    "장헌","태엽","슬현","후찬","루엘","환빈","권수","찬교","어준","언약","온찬","규종","루마","선범","후민","홍일",
    "문겸","로엘","휘랑","담휘","하로","혁기","창조","주운","순욱","진광","두한","정도","윤세","보리","휘현","인화",
    "원웅","엘리야","근홍","형종","길","청용","제운","학선","여운","완수","소라","세흠","예동","무주","효경","준권",
    "환민","성림","명후","려훈","산해","유오","의호","서익","석연","진찬","관진","중헌","의한","영길","신준","서종",
    "지철","고운","희헌","규용","소운","무연","준흠","두찬","시목","해신","기한","요찬","형일","수로","태결","자인",
    "상익","광욱","종익","상국","강태","은용","온후","경국","름","예창","시효","연흠","휘우","윤송","가한","휘도",
    "해훈","진승","사율","조단","회민","윤이","리노","이은","종률","현홍","기강","덕수","진화","재복","리담","태재",
    "청","강해","해웅","혜건","형권","제상","이","세령","지융","한림","세람","류안","택원","천","장한","성산","찬송",
    "제석","유세","기림","강성","홍근","광렬","종언","환규","세오","찬선","제겸","경혁","채안","봉준","에덴","인국",
    "희언","조윤","청우","에단","금강","홍범","은구","중연","은채","상열","시훤","군","철진","지항","제홍","새온",
    "성락","정영","일국","한일","환휘","천수","구원","근율","세권","제언","효운","현직","연휘","진안","바하","학성",
    "강선","고훈","헌영","연빈","다빗","요나","치웅","대범","원담","두하","조원","익환","해상","용상","미카엘","일규",
    "휘종","경구","찬효","인학","한강","무형","광","건학","행운","동의","권빈","주람","덕원","태무","아솔","은담",
    "해동","하름","명국","건탁","원건","선한","나일","새하","하동","주강","규윤","경균","희택","유토","사헌","훈영",
    "은설","순신","규대","승무","로와","해겸","슬호","기람","명승","예영","세겸","귀현","유중","문선","원탁","연철",
    "광연","범승","서일","화진","예광","광운","새별","균하","무송","원엽","새봄","대열","학수","장욱","공명","려원",
    "명권","성탁","효은","일권","권혁","소하","세엽","바로","구","상구","세황","창후","동회","의택","성군","유송",
    "우송","두윤","화성","예본","백민","주몽","빛가람","율한","메이슨","희욱","종경","율리","은승","본영","결희",
    "언호","호람","효동","상도","지열","상형","휘소","청현","덕진","채언","로진","찬근","희환","성대","선환","류한",
    "교찬","관률","찬균","완준","영모","무창","아름","다유","한재","범건","오승","홍경","주섭","겨루","건표","이태",
    "엘림","재창","철훈","근용","환수","효령","화수","석기","혁인","유우키","치율","상지","혜안","수재","용관","경열",
    "창한","의철","자성","대안","올리버","선표","래하","호린","창언","길호","경건","순기","은평","병지","천성","대기",
    "제","해욱","승경","민협","재구","담이","제휘","위찬","율겸","학","겨레","병운","언준","영학","두율","병모",
    "중희","로담","종섭","채인","율환","장연","수광","이후","현신","범용","현지","인건","강래","황희","준렬","규량",
    "정길","정열","치환","기건","하률","마로","하령","창의","홍식","용아","한교","홍균","다비","도화","아승","진세",
    "현엽","레오나르도","준동","중석","상정","한봄","죠슈아","범민","세유","헌서","지엘","태극","백산","호상","한흠",
    "해완","하웅","교선","화윤","유제","누림","영표","예혁","형재","홍선","효창","차오름","승의","설준","철준","세빛",
    "제은","민윤","준검","자헌","화영","수석","에스라","제익","헌율","자유","창명","석하","성백","자경","주니","휘강",
    "고든","홍우","보형","탁현","룡","도률","하규","정권","정남","소헌","융","의지","다승","인경","정홍","복음","여산",
    "대후","명곤","다니","용학","륜우","보국","고원","나오","은균","유곤","석한","상겸","효훈","병학","두관","경두",
    "준목","영창","병일","마루한","영덕","하신","균호","채문","다루","예모","서화","유경","해현","건한","세동","케이",
    "무권","관수","호섭","신범","유운","건의","운우","관태","휘중","인유","찬음","준결","보찬","희엘","효철","연담",
    "그림","대석","정관","건승","나균","강림","겸서","정국","평","상곤","우헌","채울","정률","덕우","석균","상흠",
    "황성","홍인","유동","류호","엘리엇","의율","율휘","창형","라진","호신","무호","윤열","언우","채경","의헌","재솔",
    "시문","루인","강린","영유","도선","정구","수화","구율","이신","순철","희천","택한","미노","온겸","석용","서훤",
    "두용","가호","조훈","호운","로움","찬비","로다","서규","총명","석율","택규","대철","일찬","인원","하루키","창",
    "상률","연섭","주효","지누","형환","선경","한국","보름","준은","승묵","대광","명교","인효","후연","하형","휘람",
    "영두","종필","루크","래민","우렬","예상","단이","낙원","래희","건환","선익","성길","상대","윤덕","예민","운형",
    "연하","나후","선훈","라휘","비담","정성","진목","승식","류환","인휘","감찬","대길","은동","진평","딜런","채겸",
    "주익","웅희","진제","나한","영명","기중","희래","강영","동령","찬묵","장성","해봄","대섭","시백","룩희","종웅",
    "용철","고","연율","송훈","유탁","혁호","명은","슬빈","효기","중권","관웅","죠셉","두민","다윈","상근","오빈",
    "동흔","루이스","상천","휘선","아엘","호주","백결","해용","경천","은하","니콜라스","건진","구연","위건","중휘",
    "수리","진국","부강","한종","필성","찬위","자명","철영","종효","송연","기온","기대","완기","태문","영문","세규",
    "경휘","범관","다은","준병","병성","연상","근준","재흠","남형","제이미","해광","맑음","담빈","대식","루환","래혁",
    "하휼","다후","응준","영걸","광태","시양","소찬","신효","소진","덕용","지창","찬은","강무","세음","병기","크리스",
    "의산","앤디","익","선학","이결","양태","연주","대귀","연환","범균","두겸","필모","현훈","려욱","헌성","순일",
    "현산","현래","유화","리운","형순","양훈","휴고","환욱","용국","우휘","운규","명길","용택","종일","다언","인결",
    "폴","태룡","범중","동림","호기","이튼","인덕","태명","강표","아신","자겸","제온","진강","치성","민헌","혜석",
    "우기","홍래","금준","수림","웅진","병무","해범","석헌","기보","동걸","인보","경엽","보인","다비드","동교","훈이",
    "명미정","창열","헌제","제레미","희량","장영","남결","장빈","강철","휘인","찬아","려환","희규","희유","구름",
    "규엽","수경","승린","유사","재왕","시무","지요","본하","윤의","차준","려한","장근","명도","명범","한조","윤화",
    "인지","채명","파랑","상덕","순빈","석모","무엘","은선","효정","하결","남후","위준","원현","용식","근환","진만",
    "형동","어령","교은","하루토","유덕","근표","지무","사민","휴","예선","라파엘","권상","경보","무강","희문","장휘",
    "하빛","수관","신일","나결","든솔","형관","루기","다흰","용덕","충환","승창","광섭","원성","필우","지묵","건원",
    "찬률","나호","루완","관규","동안","택영","량","남헌","영종","현길","효열","근","료","선동","예휘","섭","지아",
    "세린","하룬","문형","문주","래영","하종","단오","관준","오찬","정휴","단휘","치연","지은","도의","라헌","유아",
    "성흔","수만","덕기","준해","학찬","울","알리","이상","휘정","병용","균","무승","설후","은휴","계원","정동","두빈",
    "아얀","나얼","대국","신이","주흔","운석","재흥","유락","기령","루야","관훈","휘범","귀한","민완","영로","다힘",
    "샛별","강언","준온","경안","학재","창무","경희","승남","소우","형구","음","용구","욱재","지울","호창","문","백",
    "경린","구빈","환의","권욱","택경","원대","재록","종관","명욱","경관","라찬","도검","병조","요원","의수","리쿠",
    "서효","장오","배근","오웬","지연","상석","희선","근성","인창","강국","범철","기돈","본유","협","자빈","일영",
    "나운","승만","영혁","인균","윤신","undefined","예은","예린","서아","유나","채은","윤아","가은","민지","예진",
    "예나","아린","다연","나은","예지","소은","나연","윤지","소연","채아","채린","민아","규리","아영","예림","연아",
    "소현","민정","나경","은지","가연","라희","예슬","채연","현아","소희","소이","가영","리아","혜린","다희","설아",
    "다혜","다솜","지혜","수정","고은","아라","나영","수지","소영","단아","다영","효린","소정","채이","한나","슬아",
    "아연","보미","연지","채희","은비","소미","가인","미소","혜진","은혜","유라","혜빈","단비","현정","나린","연희",
    "해나","혜림","진아","다정","가희","혜리","지예","지희","다예","아림","리나","혜주","이나","선아","나희","은아",
    "윤정","해린","은영","서이","아정","아란","혜나","효림","하늬","수린","예리","정아","라은","은정","혜연","지나",
    "다해","유미","은주","빛나","여은","예령","혜정","초아","나예","아리","진주","다미","나래","소예","율아","혜은",
    "지선","세라","안나","채령","혜영","미나","주혜","루나","린아","혜령","에스더","초은","예봄","채림","송이","다나",
    "미주","윤경","은송","보라","지애","설하","사라","설희","주이","예음","나혜","혜지","은경","보연","은희","연정",
    "제니","보은","가령","송희","나림","제나","희은","효리","예설","수희","소빈","주미","민혜","연경","승혜","혜선",
    "미진","인혜","보아","수미","세미","새론","려은","아은","다애","소을","선미","미정","혜수","애린","선혜","나리",
    "혜미","지이","레아","민소","예희","선희","샤론","슬비","연화","가림","예소","루비","솔희","채리","솔비","서령",
    "규나","효연","유린","루미","이슬","금비","보나","신비","윤비","이설","리예","초희","소리","예솜","혜서","채유",
    "미경","이지","승미","하솜","주리","혜경","해림","솜","가경","봄이","선화","은미","세리","신혜","여정","라연",
    "희경","상아","수예","소혜","나나","리사","주예","다슬","예송","솔지","경아","소린","하니","찬미","미연","초연",
    "엘리","래아","솔아","애리","규비","규아","하얀","미영","미서","민슬","수은","진이","수애","윤혜","영아","미현",
    "예경","새롬","해연","이린","미선","규미","초이","혜온","마리","미우","해슬","가린","레나","정화","인애","래은",
    "솔이","비주","유니","설리","희나","자은","담비","명지","해은","희지","경미","아이린","서혜","여경","미지",
    "솔미","효선","예정","새나","지향","도혜","린하","이솜","지해","여빈","송아","윤미","유란","혜솔","한아","도예",
    "자영","재나","송은","설화","아미","은빛","나령","나빈","자연","설린","수련","미유","올리비아","나정","로라",
    "정미","초윤","혜슬","영미","예연","가예","가언","문정","리연","연이","하란","예아","미희","윤나","비아","가흔",
    "은샘","애나","화연","란","리은","소피아","미송","주비","상미","별이","성미","라경","라영","미성","혜랑","보림",
    "미솔","리혜","지니","아령","다교","청아","효아","초현","경림","선정","영경","새아","근아","새은","혜란","혜교",
    "은소","예다","유슬","송","정혜","채미","미란","해령","예라","소아","미리","예니","단미","단영","주애","윤별",
    "승이","예별","조아","경화","엘라","은새","다임","초롱","시예","원지","주향","미령","수혜","라나","이령","채나",
    "차은","솔하","태미","태라","아희","선예","아임","화정","명희","하희","다린","나인","가혜","나언","소휘","예란",
    "영희","보예","수이","성혜","해정","에린","윤소","신애","소언","혜현","라헬","라이","클로이","혜아","애진","희아",
    "신아","유채","엘린","희라","미혜","미화","가이","보희","은해","나형","라혜","아리아","민이","가비","로미","향기",
    "다봄","현화","이봄","혜라","여린","효나","리애","별아","아경","해미","애림","유설","장미","수향","근혜","혜윰",
    "여림","두나","혜련","여주","희림","은애","미림","화음","그레이스","수비","담은","리라","미아","서예","설이",
    "희령","나임","류경","설연","하송","레이나","미향","나진","래나","민화","나","소형","이소","려진","보혜","새미",
    "가형","시향","하미","미수","라예","민별","송미","소향","별희","미","은이","류아","규랑","연송","초하","소람",
    "은화","라미","주나","리영","라인","효지","은슬","선애","지미","보정","하예","마린","하봄","화은","보금","슬이",
    "열매","사나","승예","재니","영혜","채서","솔리","영애","노은","서지","나민","송비","현나","엠마","보령","서미",
    "남희","금주","라라","희빈","미강","시내","인비","해니","다송","슬희","경란","채니","소흔","리지","미애","가나",
    "연교","리진","금별","혜람","이화","려경","태임","초빈","아나","현미","새연","나음","해아","세란","인정","채화",
    "지슬","하슬","마리아","우미","여온","민체","채련","예빛","연솔","아련","솔잎","이림","슬혜","가진","제린","리세",
    "교린","가음","여랑","서랑","온비","채온","해선","나미","보늬","다래","율비","나봄","태란","여령","원아","민예",
    "소림","하별","효이","루시","슬하","에셀","초록","규란","령은","주해","세랑","연선","새린","유향","초영","금희",
    "미라","은초","리인","송화","해별","경자","소나","인해","햇살","로사","새라","세련","소안","여리","란희","교연",
    "세비","혜우","예향","세별","명화","라니","아중","제시카","미호","은나","다옴","효비","유의","루디아","마야",
    "다별","슬예","나슬","금빈","다효","니나","혜송","라음","은향","선이","이아","이라","이플","효언","정이","리빈",
    "희린","미승","린지","보화","영림","이유","서란","화린","효미","새빈","리희","예섬","릴리","보하","리주","난희",
    "소의","지","연채","차연","설윤","영란","은령","본아","윤해","연미","화경","영순","서엘","한송","미교","에밀리",
    "리경","서라","애미","루시아","영자","난아","사란","서의","가야","화원","예을","여나","향","빅토리아","다름",
    "차희","서임","에이미","리서","태나","나유","가률","도린","빈나","차영","나해","란아","채슬","반희","달리","연홍",
    "서나","희솔","율리아","혜니","애은","화미","초린","영숙","혜","닻별","설원","수나","의령","청하","로나","민해",
    "이본","예흔","정임","정애","순희","아이리","지송","리화","나애","률희","조앤","로지","헤나","보송","신예","미가",
    "루라","새얀","화인","희애","우아","청미","리앙","고윤","메이","해라","현숙","정자","여람","륜하","아유","희란",
    "서음","엘레나","스텔라","해이","라유","은실","려온","새인","률아","은봄","유가","요은","미리내","미사","예든",
    "크리스티나","가애","유니스","아주","현슬","수임","이채","다령","민나","사은","민애","비안","금빛","예화","서해",
    "휘은","지흔","난영","명숙","여을","순자","화령","교림","가란","우나","류은","풀잎","성애","샤인","여솔","설영",
    "리디아","요안나","경리","하나린","영리","초율","드보라","영나","령아","서별","솔인","경혜","신해","다음","온서",
    "라별","현설","빛나라","마미","예임","해란","영린","순화","예교","이사벨라","언지","향미","경령","비송","경숙",
    "해듬","모은","나금","아형","레이첼","새솔","소령","채랑","새빛","희송","인나","히나","엘리나","해늘","유리나",
    "채음","가륜","하안","아해","애령","효안","미린","비야","봄희","두아","미엘","클레어","지화","하련","미미","유리아",
    "다홍","명경","채란","현혜","규이","줄리아","연비","아혜","솜이","화","리향","레베카","화빈","여현","아리엘",
    "경지","휘린","사영","의린","해지","양자","엘리사","루은","예울","초민","아선","온아","크리스틴","효슬","체리",
    "담인","모경","려나","래경","효희","이사벨","혜음","명아","제니퍼","경애","륜아","지양","아리솔","소엘","효솔",
    "다이","차미","정순","정숙","류희","하비","명미","류나","글로리아","물결","진의","이비","우향","혜규","리효","아송",
    "모빈","온리","소월","규령","라아","해송","유솜","인예","에리카","경채","혜신","예름","새영","헤일리","화현","미오",
    "문희","효송","다야","인설","슬지","나오미","마나","선향","지숙","소화","송지","메아리","나휘","향유","다선","햇님",
    "단경","우화","희소","소애","비비안","샘물","묘정","화율","엘리아나","해경","소온","은숙","승해","진설","난경",
    "서애","리제","에바","우자","진실","진비","서흔","화민","미설","은솜","운정","륜희","준혜","여율","채송","해솜",
    "소해","비채","진미","율채","보서","시애","여희","영연","금미","화림","령경","국희","미담","초림","연의","일리",
    "줄리","은체","주란","명자","혜이","유랑","순미","조희","예미","하예라","화선","혜숙","선해","아솜","근령","세지",
    "온누리","유기","채을","강비","리미","초미","미카","희예","순옥","해을","진혜","예련","클라라","조에","미건","예론",
    "애지","경난","래연","서련","미순","로렌","령나","채향","운주","려운","휘아","영옥","율린","홍지","온하","보슬",
    "앨리","향리","채라","정림","영실","명순","소선","밀라","미조","유이나","리야","요하","자림","시야","안젤라","승애",
    "애화","서리","안리","성린","예언"
];

const RanUtil = {}; // 네임스페이스용 빈 객체

//랜덤 컨텐트용
RanUtil.ranContent = function(){
    let ranIndex = Math.floor(Math.random()* contents.length);
    return contents[ranIndex];
}


//랜덤 타이틀용
RanUtil.ranTitle = function(){
    let ranIndex = Math.floor(Math.random()* titles.length);
    return titles[ranIndex];
}

// 랜덤 이름 메소드 ranFullName
RanUtil.ranFullName = function(){
    let ranFamInx =  Math.floor(Math.random()*korFamNames.length);
    let ranNameInx =  Math.floor(Math.random()*korNames.length);
    return korFamNames[ranFamInx] + korNames[ranNameInx]; 
}


// 배열 요소 중  중복없이 랜덤개 리턴
// 일부러 애매모호하게, 자발적 리팩토링 필요!
RanUtil.ranArrLength = function(pArr,pMinCnt,pMaxCnt){
    let ranCnt = Math.round(Math.random()*(pArr.length - pMinCnt));
    let copyArr = structuredClone(pArr);
    for(let i=0; i<ranCnt; i++){
        let ranIndex = Math.floor(Math.random()* copyArr.length);
        copyArr.splice(ranIndex,1);
    }
    
    if(copyArr.length > pMaxCnt){
        for(let i=0; i<= (copyArr.length - pMaxCnt); i++){
            copyArr.splice(i,1);
        }
    }
    return copyArr;
}

// 배열 요소 중 1개
RanUtil.oneOfArr = function(pArr){
        let ranIndex = Math.floor(Math.random()* pArr.length);
        return pArr[ranIndex];
}

// 랜던 날짜 (오늘 기준 이전 90일)
RanUtil.ranDate = function(){
    let now = new Date();
    now.setDate(now.getDate() - Math.floor(Math.random()*90));

    let rYear = now.getFullYear();

    let rMonth = now.getMonth() + 1;
    if(rMonth < 10) rMonth = "0" + rMonth;

    let rDate = now.getDate();
    if(rDate < 10) rDate = "0" + rDate;

    return `${rYear}-${rMonth}-${rDate}`;
}
var newYearAct = {
	colorarr:["#FC8F00","#FFFFFF","#FCFF00","#17A500","#000000","#03d8fe","#7019E7","#FF00F6","#FF0700"],//盛放随机之后的数组
	colors : ["#FFFFFF","#FC8F00","#FCFF00","#17A500","#000000","#7019E7","#03d8fe","#FF0700","#FF00F6"], // color 数组
	words : ["红","黄","黑","蓝","白","绿","粉","紫","橙"], // 字数组
	gameEx : "<h3>多人游戏玩法</h3>玩家在30秒内根据顺序记住字的颜色,30秒之后根据玩家自己抽到的题板进行站队,站错、或者位置找的慢,都将被淘汰!"+
			 "<h3>单人游戏玩法</h3>玩家在一定时间内记住颜色的顺序(最长为30s),然后进入答题阶段,玩家根据自己记住的颜色顺序点击颜色版,点完之后会显示出玩家记忆消耗的时间与所得的分数,分数高者获胜,相同分数时间少者获胜。",
	json : "",
	time : 30,
	oldTime :'',
	timer : "", // 定时器 
	index : 0, //验证正确性问题
	score : 0, // 分数
	isPrize : true,// 是否可以领取奖励
	isOnly : false,//游戏是否是单人,默认是多人
	// 回答问题
	response : function (){
		// 把游戏主体隐藏
		// 把音乐关闭 进度改为0
		var audioAction = document.getElementById("audioAction");
		if (audioAction) {
			var setProcessOK = document.getElementById("setProcessOK");
			audioAction.onclick();
			if (setProcessOK) {
				setProcessOK.onclick();
			}
		}
		clearInterval(this.timer);
		var gameBox = document.getElementById("gameBox");
		var ul = gameBox.getElementsByTagName("ul")[0];
		var time = document.getElementById("time");
		var onediv = document.getElementById("onediv")
		if (gameBox&&ul&&time) {
			gameBox.removeChild(ul);
			gameBox.removeChild(time);
		}
		if (onediv) {
			gameBox.removeChild(onediv);
		}
		if (this.isOnly) {
			// 创建供玩家选择的 ul
			var choicediv = document.createElement("div");
			choicediv.id = 'response';
			var choice = document.createElement("ul");
			choice.id = "choice";
			var that = this;
			for (var i = 0 , len = this.colorarr.length ; i < len ; i ++){
				var li = document.createElement("li");
				li.style.backgroundColor = this.colorarr[i];
				li.index = i;
				li.onclick = function (){
					that.validate(that.colorarr[this.index]);
				}
				choice.appendChild(li);
			}
			// 创建验证答案
			var validate = document.createElement("ul");
			validate.id = "validate";
			choicediv.appendChild(choice);
			choicediv.appendChild(validate);
			gameBox.appendChild(choicediv);
		}else {
			var divM = document.createElement("div");
			divM.id = "divM";
			var inputM = document.createElement("input");
			inputM.type = "button";
			inputM.id = "moreRe";
			inputM.value = "查看答案";
			// var inputRe = document.createElement("input");
			// inputRe.type = "button";
			// inputRe.id = "inputRe";
			// inputRe.value = "回到菜单";
			// var inputNew = document.createElement("input");
			// inputNew.type = "button";
			// inputNew.id = "inputRe";
			// inputNew.value = "重新开始";
			divM.appendChild(inputM);
			// divM.appendChild(inputNew);
			// divM.appendChild(inputRe);
			gameBox.appendChild(divM);
			inputM.setAttribute("onclick","newYearAct.moreRe()")
		}
	},
	// 多人游戏查看答案
	moreRe : function(){
		var gameBox = document.getElementById("gameBox");
		var divM = document.getElementById("divM");
		gameBox.removeChild(divM);
		var someUl = document.createElement("ul");
		someUl.id = "someul";
		for (var i = 0 , len = this.colors.length ; i < len ; i ++){
			var li = document.createElement("li");
			var p = document.createElement("p");
			p.style.color = "#ccc";
			p.innerHTML = i+1;
			var span = document.createElement("span");
			p.onclick = function (){
				var spanP = this.nextSibling;
				spanP.style.opacity = 0;
			}
			li.appendChild(p);
			li.appendChild(span);
			li.style.backgroundColor = this.colors[i];
			someUl.appendChild(li);
		}
		var divMore = document.createElement("div");
		divMore.id = "divMore";
		var inputRe = document.createElement("input");
		inputRe.type = "button";
		inputRe.value = "重新开始游戏";
		inputRe.setAttribute("onclick","newYearAct.reGame()")
		var inputMenu = document.createElement("input");
		inputMenu.type = "button";
		inputMenu.value = "回主菜单";
		inputMenu.setAttribute("onclick","newYearAct.goMenu()")
		divMore.appendChild(inputRe);
		divMore.appendChild(inputMenu);
		gameBox.appendChild(divMore);
		gameBox.appendChild(someUl);
	},
	// 重新开始游戏
	reGame : function (){
		var gameBox = document.getElementById("gameBox");
		if (gameBox && gameBox.parentNode) {
			gameBox.parentNode.removeChild(gameBox);
		}
		this.index = 0 ;
		this.score = 0 ;
		this.onlyTime = 0;
		this.time = this.oldTime;
		this.isPrize = true;
		this.createBody();
	},
	// 验证
	validate : function (color){
		var validate = document.getElementById("validate");
		var li = document.createElement("li");
		li.style.backgroundColor = color;
		if (color == this.colors[this.index]) {
			li.innerHTML = "√";
			this.score ++;
		}else{
			li.innerHTML = "X";
		}
		this.index ++;
		if (this.index == this.colorarr.length) {
			var choice = document.getElementById("choice");
			if (this.score >=6) {
				choice.innerHTML = "你在"+this.onlyTime+"秒内获得 : " + this.score + "分";
			}else{
				choice.innerHTML = "你在"+this.onlyTime+"秒内获得 : " + this.score + "分";
			}
			// 创建查看答案 
			var divgroup = document.createElement("div");
			var inputbtn = document.createElement("input");
			inputbtn.type = "button"; 
			inputbtn.value = "查看答案";
			inputbtn.id = "look";
			inputbtn.setAttribute("onclick","newYearAct.getAnswer(this)")
			// 创建重新开始游戏
			var inputbtn1 = document.createElement("input");
			inputbtn1.type = "button"; 
			inputbtn1.value = "重新开始游戏";
			inputbtn1.id = "re";
			inputbtn1.setAttribute("onclick" , "newYearAct.reGame()");
			// 创建查看奖励
			var inputReward = document.createElement("input");
			inputReward.id = "reward";
			inputReward.type = "button"; 
			// inputReward.value = "查看奖励";
			inputReward.value = "回到主菜单";
			// inputReward.setAttribute("onclick","newYearAct.whatPrize()");
			inputReward.setAttribute("onclick","newYearAct.goMenu()");
			var response = document.getElementById("response");
			divgroup.appendChild(inputbtn);
			divgroup.appendChild(inputbtn1);
			divgroup.appendChild(inputReward);
			response.appendChild(divgroup);
		}
		validate.appendChild(li);
	},
	//回到主菜单
	goMenu : function (){
		// this.reGame();
		this.index = 0 ;
		this.score = 0 ;
		this.time = this.oldTime;
		this.onlyTime = 0;
		this.isPrize = true;
		var gameBox = document.getElementById("gameBox");
		var btns = document.getElementById("btns");
		gameBox.parentNode.removeChild(gameBox);
		btns.style.display = "block";
	},
	// 查看奖励
	whatPrize : function (){
		if (this.isPrize == true) {
			if (this.score <= 5) {
				Module.show("分数这么低还要奖励你脸皮太厚了吧,还不重新开始",'新年快乐');
			}else{
				Module.show("恭喜你获得"+this.score*5+"元红包",'新年快乐');
			}
			this.isPrize = false;
		}else{
			Module.show("你已经领取过了奖励不要太贪心哦！","新年快乐");
		}
	},
	// 正确答案
	getAnswer : function (a){
		a.disabled = true;
		var response = document.getElementById("response")
		var answer = document.createElement("ul");
		answer.id = "answer";
		for(var i = 0 , len = this.colors.length ; i < len ; i ++){
			var li = document.createElement("li");
			li.style.backgroundColor = this.colors[i];
			answer.appendChild(li);
		}
		response.appendChild(answer);
	},
	// 创建游戏
	createBody : function (){
		// 播放音乐
		var audioAction = document.getElementById("audioAction");
		if (audioAction.value!="播放") {
			audioAction.onclick();
		}
		if (audioAction) {
			setTimeout(function(){
				audioAction.onclick();
			},2000)
		}
		// 把按钮隐藏
		this.getJson();
		var btns = document.getElementById("btns");
		btns.style.display = "none";
		var gameBox = document.createElement("div");
		gameBox.id = "gameBox";
		var that = this;
		if (this.isOnly) {
			var onediv = document.createElement("div");
			onediv.id = "onediv";
			onediv.innerHTML = "我记住了";
			onediv.onclick = function(){
				that.response();
			}
			gameBox.appendChild(onediv);
		}
		gameBox.style.width = this.getClient().width + "px";
		gameBox.style.height = this.getClient().height + "px";
		var ul = document.createElement("ul");
		ul.id = "game";
		var json = this.json;
		for(var i = 0 ,len = json.length ; i < len ; i ++){
			var li = document.createElement("li");
			li.innerHTML += json[i].word;
			li.innerHTML += "<p>"+(i+1)+"</p>";
			li.style.color = json[i].color;
			ul.appendChild(li);
		}
		gameBox.appendChild(ul);
		document.body.appendChild(gameBox);
		this.createTime(gameBox);
	},
	// 单人游戏
	onlyStar : function (){
		this.isOnly = true;
		this.createBody();
	},
	// 多人游戏
	star : function (){
		this.isOnly = false;
		this.createBody();
	},
	// 倒计时
	createTime : function (gameBox){
		this.oldTime = this.time;
		var time = document.createElement('div');
		time.id = "time";
		time.innerHTML = this.time;
		gameBox.appendChild(time);
		// this.response();
		// return;
		var that = this;
		that.onlyTime = 0;
		this.timer = setInterval(function (){
			that.time -= 1 ;
			that.onlyTime += 1;
			time.innerHTML = that.time;
			if (that.time <= 0) {
				clearInterval(that.timer);
				that.response();	
			}
		},1000);
	},
	// 字和颜色组合成json数组
	getJson : function (){
		var obj = [];
		var colors  = this.sortArr(this.colors);
		var words = this.sortArr(this.words);
		for(var i = 0 , len = colors.length ; i < len ; i ++){
			obj[i] = {};                                                                  
			obj[i].color = colors[i];
			obj[i].word = words[i];
		}
		this.json = obj;
	},
	// 数组随机打乱方法 
	sortArr : function (arr){
		var _floor = Math.floor, _random = Math.random,  
        len = arr.length, i, j, arri,  
        n = _floor(len/2)+1;  
		while( n-- ){  
		    i = _floor(_random()*len);  
		    j = _floor(_random()*len);  
		    if( i!==j ){  
		        arri = arr[i];  
		        arr[i] = arr[j];  
		        arr[j] = arri;  
		    }  
		}  
		return arr; 
	},
	// 获得浏览器的宽度和高度
	getClient : function (){
		var obj = {};
		obj.width = document.documentElement.clientWidth || document.body.clientWidth;
		obj.height = document.documentElement.clientHeight || document.body.clientHeight;
		return obj;
	}
};
// alert(模拟)
var Module = {
    show : function (val,h2,pro){
        this.hide();
        var body = document.body;
        var model = document.createElement("div");
        model.id = "model";
        var innerArr = [];
        var modelCont = document.createElement("div");
        modelCont.id = "modelCont";
        innerArr.push("<h2>"+h2+"</h2>");
        innerArr.push("<div class='body'>")
        innerArr.push("<p>"+val+"</p>")
        innerArr.push("</div>");
        if (pro == 'time') {
            setTimeout(function(){
                //这里使用this不可以！
                 Module.hide();
            },3000)
        }else if(pro == "confrim"){
            innerArr.push("<div class= 'foot'>")
            innerArr.push("<span class='left' onclick='Module.comfirmFalse()'>取消</span><span onclick='Module.comfirmTrue()'>确定</span>")
            innerArr.push("</div>");
        }else{
            innerArr.push("<div class= 'foot'>")
            innerArr.push("<p onclick='Module.hide()'>确认</p>")
            innerArr.push("</div>");
        }
        modelCont.innerHTML = innerArr.join("");
        body.appendChild(modelCont);
        body.appendChild(model);
    },
    hide : function (){
        var body = document.body;
        var model = document.getElementById("model");
        var modelCont = document.getElementById("modelCont");
        if (model) {
            body.removeChild(model);
            body.removeChild(modelCont);
        }
    },
    comfirmTrue : function (){
        this.hide();
        return true;
    },
    comfirmFalse : function (){
        this.hide();
        return false;
    } 
};
window.onload = function (){
	// 音乐
	var playerMp3 = function(mp3){
        var playerMp3 = function(option){//mp3播放器

            this.audio = option.audio;
            this.audioAction = option.audioAction;
            this.process = option.process;
            this.setProcessO = option.setProcess;
            this.setProcessOK = option.setProcessOK;
            this.volup = option.volup;
            this.voldown = option.voldown;
            this.muted = option.muted;

            var self = this;

            this.audioAction.onclick = function(){ //播放控制
                if(this.value == "播放"){
                    self.start();
                    this.value = "暂停";
                }else{
                    self.pause();
                    this.value = "播放";
                }
            }

            this.volup.onclick = function(){//音量增大
                self.setVolup();
            }

            this.voldown.onclick = function(){//音量减少
                self.setVoldown();
            }

            this.muted.onclick = function(){//静音、发声
                self.setMute();
            }

            setInterval(function(){//获取播放进度
                self.getProcess();
            },1000)

            this.setProcessOK.onclick = function(){//确定修改进度
                self.setProcess();
            }

        }

        playerMp3.prototype.start = function(){//开始播放
            this.audio.play();
        }


        playerMp3.prototype.pause = function(){//暂停播放
            this.audio.pause();
        }

        playerMp3.prototype.getProcess = function(){//获取播放进度
            this.process.value = Math.floor(this.audio.currentTime) + "秒";
        }

        playerMp3.prototype.setProcess = function(){//设置播放进度
            this.audio.currentTime = (this.setProcessO.value || 0);
        }

        playerMp3.prototype.setVolup = function(){//音量+
            var v = this.audio.volume + 0.1;

            this.audio.volume = (v > 1 ? 1 : v);
        }

        playerMp3.prototype.setVoldown = function(){//音量-
            var v = this.audio.volume - 0.1;

            this.audio.volume = (v < 0 ? 0 : v);
        }

        playerMp3.prototype.setMute = function(){//静音/发声
            this.audio.muted = !this.audio.muted;
            this.audio.muted ? (this.muted.value = "发声") : (this.muted.value = "静音");

        }

        //实例化播放器
        return new playerMp3(mp3);
    }
    /*=========HTML5版Js实现的MP3播放器==============*/
    playerMp3({
        "audio":document.getElementById("audio"),//音频对象
        "audioAction":document.getElementById("audioAction"),//音频控制播放或暂停
        "process":document.getElementById("process"),//播放进度
        "setProcess":document.getElementById("setProcess"),//修改播放进度
        "setProcessOK":document.getElementById("setProcessOK"),//确定修改进度
        "volup":document.getElementById("volup"),//音量增大
        "voldown":document.getElementById("voldown"),//音量减小
        "muted":document.getElementById("muted")//静音
    })
    // 讲话切换
    var leftp = document.getElementById("leftp");
    var rightp = document.getElementById("rightp");
    // var speekleft = ["我盼了好久终於盼到今天！","恕我直言：在座的各位都是辣鸡！","嘿小鸡仔,你说今年年会有奖品吗？","那你猜猜老大准备了啥奖品?","我想要豪车、洋房、美女、钞票","行政妹子跟我说,送祝福有奖品","祝公司:新的一年,业绩更上一层楼!","祝同事:身体健康,万事如意!","祝福你:遂你冲天志,百尺竿头高起","你说下边的人发现咋俩会说话了不?"];
    // var speekRight = ["你有什么话说?","一个能打的都没有！","不可能只是来吃饭吧！","重要的是咱们能中啥！","那你还是继续想吧。","那还不麻溜滴想!","那同事呢?","没新意,那我呢?","少年,这是歌词吧!","运气好的都发现了！"];
    var speekleft = ["恕我直言：在座的各位都是辣鸡！","年会先定个小目标？","厉害了word哥，别葛优躺啦，上台游戏","参与游戏要有工匠精神","没中奖我好蓝瘦香菇","个个都是吃瓜群众"];
    var speekRight = ["一个能打的<br>都没有","那先来十只<br>母鸡！","老司机<br>带带我！","你这么厉害，咋不上天呢","是啊，我已经用了洪荒之力","城市套路深  我要回农村！"];
    if (leftp && rightp) {
    	var i = 0;	
    	leftp.innerHTML = speekleft[i];		
    	rightp.innerHTML = speekRight[i];
    	setInterval(function(){
    		i ++ ;
    		if ( i > speekRight.length-1) {
    			i = 0 ;
    		}
    		leftp.innerHTML = speekleft[i];
    		rightp.innerHTML = speekRight[i];
    	},5000);
    }
}
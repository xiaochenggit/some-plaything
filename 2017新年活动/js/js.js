var newYearAct = {
	colorarr:["red","yellow","black","blue","white","green","brown","purple","orange"],//盛放随机之后的数组
	colors : ["white","purple","yellow","green","black","orange","blue","red","brown"], // color 数组
	words : ["红","黄","黑","蓝","白","绿","综","紫","橙"], // 字数组
	gameEx : "游戏产生随机的字和颜色,玩家只需要在一定时间之内记住颜色的顺序,然后再颜色版中按照顺序点出,然后就可知晓分数,最高分数为9分",
	json : "",
	time : 1,
	oldTime :'',
	timer : "", // 定时器 
	index : 0, //验证正确性问题
	score : 0, // 分数
	isPrize : true,// 是否可以领取奖励
	isOnly : false,//游戏是否是单人,默认是多人
	// 回答问题
	response : function (){
		// 把游戏主体隐藏
		var gameBox = document.getElementById("gameBox");
		var ul = gameBox.getElementsByTagName("ul")[0];
		var time = document.getElementById("time");
		if (gameBox&&ul&&time) {
			gameBox.removeChild(ul);
			gameBox.removeChild(time);
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
			gameBox.appendChild(someUl);
		}
	},
	// 重新开始游戏
	reGame : function (){
		var gameBox = document.getElementById("gameBox");
		console.log(gameBox);
		if (gameBox && gameBox.parentNode) {
			document.body.removeChild(gameBox);
		}
		this.index = 0 ;
		this.score = 0 ;
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
			choice.innerHTML = "恭喜你获得" + this.score + "分";
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
			inputReward.value = "查看奖励";
			inputReward.setAttribute("onclick","newYearAct.whatPrize()");
			var response = document.getElementById("response");
			divgroup.appendChild(inputbtn);
			divgroup.appendChild(inputbtn1);
			divgroup.appendChild(inputReward);
			response.appendChild(divgroup);
		}
		validate.appendChild(li);
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
		// 把按钮隐藏
		this.getJson();
		var btns = document.getElementById("btns");
		btns.style.display = "none";
		var gameBox = document.createElement("div");
		gameBox.id = "gameBox";
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
		this.timer = setInterval(function (){
			that.time -= 1 ;
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
	
}
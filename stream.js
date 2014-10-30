function Stream(start,step,filterFunc){

	this.head = start;
	if(step)
		this.step = step;
	else 
		this.step = 1;
	this.nextVFunc = function (n) { return n + this.step;}
	if (filterFunc)
		this.filterFunc = filterFunc;
	else
		this.filterFunc = null;
		
	this.tail = function () {
		return new Stream( this.nextVFunc (this.head ), this.step, this.filterFunc);
	};
	
	this.take = function (n){
		if (n == 0)
			return [];
		if(this.filterFunc){
			var h = this.filterFunc(this.head);
			if (h)
				return [this.head].concat(this.tail().take(n - 1)); 
			else
				return this.tail().take(n); 
		}else{
			return [this.head].concat(this.tail().take(n - 1));
		}
	}
	
	this.cons  = function (tailStream){
		var f = function () { return tailStream; }
		this.tail = f;
		return this;
	}
	
	this.filter = function (f){
		return new Stream(this.head, this.step, f);
	}
}

//////////////////////////
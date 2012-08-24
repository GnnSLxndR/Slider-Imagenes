;(function($, window, undefined){
	var Slider = function(elem, opciones) {
        this.elem  = elem;
        this.$elem = $(elem);

        if(this.init) {
            this.init(opciones);
        }
    }
    Slider.prototype={
    	defaults : {
    		anterior : '#prev',
    		siguiente : '#next',
    		slideActual : 0,
            animate : 'swing',
            duration : 2000,
    	},
    	init : function(opciones){
    		this.config = $.extend({}, this.defaults, opciones);

    		this.$contendor = this.$elem.children().eq(0);
    		this.$lista = this.$contendor.children();
    		this.cantidad = this.$contendor.children().length;
            this.slideWidth = this.$contendor.width();
            console.log(this.slideWidth);
    		this.slide = {
                present : this.config.slideActual,
    			move : false,
    		};		
            
            this.$lista.hide();
            this.$lista.eq(this.config.slideActual).show();
    		obj = this;

    		$(this.config.siguiente).on('click',function(){
    			obj.siguiente(obj.slide.present);
    		});

    		$(this.config.anterior).on('click',function(){
    			obj.anterior(obj.slide.present);
    		});
    	},
    	cambioPosicion: function(slide, sentido){
            if(sentido == "-"){
                if(slide < this.cantidad - 1){
                    slide = slide + 1;
                }else{
                    slide = 0;                    
                }
                this.$lista.eq(slide).css('left',this.slideWidth+'px').show();
    		}else{
                if(slide  == 0){
                    slide = this.cantidad - 1;                   
                }else{                    
                    slide = slide - 1;                   
                }
                 this.$lista.eq(slide).css('left','-'+this.slideWidth+'px').show();
            }
    		return slide;
    	},
    	animar : function(slide, sentido){
    		//var obj = this;
    		this.slide.move = true;
    		this.$lista.eq(slide).animate({
    			//width: '0px'
    				left: sentido+'='+this.slideWidth+'px',
  					},this.config.duration,this.config.animate,
  					function (){
  						obj.slide.present = slide;
  						obj.slide.move = false;
  					} 	
  				);
    	},
    	siguiente : function(slide){
    		sentido ="-";
    		if(!this.slide.move){
    			this.animar(slide,sentido);
    			var nuevoSlide =this.cambioPosicion(slide, sentido);
    			this.animar(nuevoSlide,sentido);
    		}
    	},

    	anterior : function(slide){
    		sentido ="+";
    		if(!this.slide.move){
    			this.animar(slide,sentido);
    			var nuevoSlide =this.cambioPosicion(slide,sentido);
    			this.animar(nuevoSlide,sentido);
    		}
    	}
    }

    $.fn.slider = function(opciones) {
        if(typeof opciones == "string") {
            metodo = opciones;
            args = Array.prototype.slice.call(arguments, 1);

            var slider = this.data('slider') ?
                this.data('slider') : 
                new Slider(this);
            
            if(slider[metodo]) {
                slider[metodo].apply(slider, args);    
            }
        } else if(typeof opciones == 'object' || !opciones) {
            this.data('slider', new Slider(this, opciones));
        } else {
            $.error('parámetro no valido');
        }

        return this;
    }

window.Slider = Slider;
})($,window);
	app.verificarFechas = function()
	{
   	 /*navigator.notification.alert(
     'Eres el ganador!',      // mensaje (message)
     null,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
     'Game Over',            // titulo (title)
         'Restart'          // botones (buttonLabels)
         );*/
   	     var listaDrogas=[];
		var storedDate = window.localStorage.getItem("firstDate");
		if(!storedDate)//se ejecuta solo la primera vez que se abre la aplicacion
		{
			var today = new Date();
			window.localStorage.setItem("firstDate",today);
			var nextUpdate = new Date();
			nextUpdate.setMonth(today.getMonth() + 1);
			window.localStorage.setItem("nextUpdate",nextUpdate);
		//	alert('guardado '+today);
			//alert('siguiente '+nextUpdate);
			setImageURLS();
		}
		else
		{
			var today= new Date();
             
			var nextUpdate = new Date(window.localStorage.getItem("nextUpdate"));
      var n = new Date(nextUpdate.getFullYear(), nextUpdate.getMonth(), nextUpdate.getDate());
            
            //	alert('hoy '+today);
			//alert('siguiente '+n);
			if(today.valueOf()<nextUpdate.valueOf())
			{
				//alert('actualizar');
				  $.blockUI({ message: 'Cargando datos...'});
                
                $.get("http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Justicia/drogadescr?&$format=json").
			//	$.get("http://yoreporto.herokuapp.com/twitter/tweets/", {"count": 20}, "json").
					done(function (data) {
					 $.unblockUI();
                        var nombres=[];
                        var partesCuerpo=[];
                        var enfermedades=[];
                       
                        var currentDrug=null;
                        var currentPart=null;
                      
                        
                        
                        
                        for (var y in data.d) 
                        {   
                            nombres.push(data.d[y].nombredeladroga);
                        }
                        var singleDrugs=count(nombres);
                        //  alert(singleDrugs);
                        for(var a in singleDrugs)
                        {
                            
                             currentDrug=singleDrugs[a];
                            var droga = new drug(currentDrug);
                            
                            
                            //drug.partes=new Map();
                           
                            for (var x in data.d) 
                            {
                               if(currentDrug==data.d[x].nombredeladroga)
                               {
                                   //alert(currentDrug);
                                   var parte=data.d[x].partedecuerpo;
                                   var efecto=data.d[x].enfermedad;
                                   //alert(parte);
                                   //alert(efecto);
                                   droga.insert(parte, efecto);
                               }
                            }
                            //alert(droga.nombre);
                            listaDrogas.push(droga);
                        }
                        var show=listaDrogas.pop();
                        alert(show.nombre);
                        alert(show.partes.get("boca"));
                        
                        var lista = document.getElementById("extasisList");
                        var now=show.partes.current;
                      for(var i=0;i<show.partes.size;i++)
                      {
                          
                        
                          //alert(i+now.key+" "+now.value);
                          
                          var efectos=now.value.split("/");
                          //alert(efectos);
                          for(var j=0;j<efectos.length-1;j++)
                          {alert(j);
                            var el = document.createElement("li");
                            var pe = document.createElement("p");
                            var e = efectos[j];alert(e);
                              pe.innerHTML = e;alert("h1");
                            el.appendChild(pe);alert("h2");
                            lista.appendChild(el);alert("h3");
                          }
                          
                          
                          now=now.next;
                      }
                        
                    
                         var ecabeza=show.partes.get("cabeza");
                         var eboca=show.partes.get("boca");
                         var egarganta=show.partes.get("garganta");
                         var ecorazon=show.partes.get("corazón");
                         var eestomago=show.partes.get("estomago");
                        alert("hey2");
                       	var cabezas=ecabeza.split("/"); alert("hey3");
                        var bocas=eboca.split("/"); alert("hey4");
                        var gargantas=egarganta.split("/"); alert("hey5");
                        var corazones=ecorazon.split("/"); alert("hey6");
                        var estomagos=eestomago.split("/"); alert("hey7");
                        alert("hey!");
                        alert(cabezas.pop);
                  		/*for (x in data.tweets) {
                        var trino = data.tweets[x].text;
                        var image = data.tweets[x].profile_image_url;
                        var el = document.createElement("il");
                        var pe = document.createElement("p");
                        pe.innerHTML = trino;
                        var img = document.createElement("img");
                        img.src = image;
                        //el.textContent = trino;
                        el.appendChild(img);
                        el.appendChild(pe);
                        //el.list-style-image = url(image);
                        lista.appendChild(el);
                    }*/                        
                        
                        
                  	//alert('downloaded');
					
					/*var nombre="nombredroga";
					var imageURL=window.localStorage.getItem(nombre+"URL");
					if(imageURL!=json.imageURL)
					{
						var newPhoto = document.getElementById("drugPhoto");
						newPhoto.src=imageURL;
						var imgCanvas = document.createElement("canvas");
						var imgContext = imgCanvas.getContext("2d");
						imgCanvas.width = newPhoto.width;
						imgCanvas.height = newPhoto.height;
						imgContext.drawImage(newPhoto, 0, 0, newPhoto.width, newPhoto.height );
						var datauri = imgCanvas.toDataURL("image/jpeg", 0.5); //0.5 = optional quality
						try 
						{
							window.localStorage.setItem(nombre+"URL", datauri);
							newPhoto.src = "data:image/gif;base64," + datauri;
						}catch (e) 
						{
							console.log("Storage failed: " + e);
						};
					}*/
				
				
				nextUpdate.setMonth(today.getMonth() + 1);
				window.localStorage.setItem("nextUpdate",nextUpdate);
				 }).fail(function (data) 
				 {
					alert('Fail :( => '+data);
					  $.unblockUI();
			});
				
			}
			else
			{
				alert('no actualizar');
			}
		}
	
	};

function drug (nombre) {
    this.nombre = nombre;
    this.partes = new Map();
    this.insert = insert;
}
 
// anti-pattern! keep reading...
function insert(parte, efecto) 
{
     var efectos=this.partes.get(parte);      
           if(efectos===undefined   )
           {
                efecto+="/";
                this.partes.put(parte,efecto);
           }
           else
           {
                efectos+=efecto;
                efectos+="/";
                this.partes.remove(parte);
                this.partes.put(parte,efectos);
           }    
}

function count(arreglo) {  

    arreglo.sort();
    var nuevoArreglo=[];
    var current = null;
   
    for (var i = 0; i < arreglo.length; i++) {
        if (arreglo[i] != current) 
        {
            nuevoArreglo.push(arreglo[i]);
        }
            current = arreglo[i];           
        }
    return nuevoArreglo;
    }


	//setea las URL de las imagenes de cada droga
	function setImageURLS()
	{
		window.localStorage.setItem("AlcoholURL","http://www.odc.gov.co/Portals/1/aplicacion-odc/imagenes/prevalencia-consumo-alcohol.jpg");
		window.localStorage.setItem("TabacoURL","http://www.odc.gov.co/Portals/1/aplicacion-odc/imagenes/prevalencia-consumo-tabaco.jpg");
		window.localStorage.setItem("MarihuanaURL","http://www.odc.gov.co/Portals/1/aplicacion-odc/imagenes/prevalencia-consumo-marihuana.jpg");
		window.localStorage.setItem("CocainaURL","http://www.odc.gov.co/Portals/1/aplicacion-odc/imagenes/prevalencia-consumo-cocaina.jpg");
		window.localStorage.setItem("InhalablesURL","http://www.odc.gov.co/Portals/1/aplicacion-odc/imagenes/prevalencia-consumo-solventes.jpg");
		window.localStorage.setItem("ExtasisURL","http://www.odc.gov.co/Portals/1/aplicacion-odc/imagenes/prevalencia-consumo-extasis.jpg");
		window.localStorage.setItem("HeroinaURL","http://www.odc.gov.co/Portals/1/aplicacion-odc/imagenes/prevalencia-consumo-heroina.jpg");
		window.localStorage.setItem("LSDURL","http://www.odc.gov.co/Portals/1/aplicacion-odc/imagenes/prevalencia-consumo-lsd.jpg");
		window.localStorage.setItem("sedantesURL","http://www.odc.gov.co/Portals/1/aplicacion-odc/imagenes/prevalencia-consumo-sedantes.jpg");
		window.localStorage.setItem("opioidesURL","http://www.odc.gov.co/Portals/1/aplicacion-odc/imagenes/prevalencia-consumo-opioides.jpg");
		window.localStorage.setItem("2CBURL","http://www.odc.gov.co/Portals/1/aplicacion-odc/imagenes/prevalencia-consumo-2-CB.jpg");
		window.localStorage.setItem("KetaminaURL","http://www.odc.gov.co/Portals/1/aplicacion-odc/imagenes/prevalencia-consumo-ketamina.jpg");
		window.localStorage.setItem("AnfetaminaURL","http://www.odc.gov.co/Portals/1/aplicacion-odc/imagenes/prevalencia-consumo-anfetaminas.jpg");
		//alert('hey');
	}
app.verificarFechas = function()
	{
   
   	     var listaDrogas=[];
		
				  $.blockUI({ message: 'Cargando datos...'});
                
                $.get("http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Justicia/drogadescr?&$format=json").
					done(function (data) {
					 
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
                        for(var a in singleDrugs)
                        {
                             currentDrug=singleDrugs[a];
                            var droga = new drug(currentDrug);
                                                 
                            for (var x in data.d) 
                            {
                               if(currentDrug==data.d[x].nombredeladroga)
                               {
                                   var parte=data.d[x].partedecuerpo;
                                   var efecto=data.d[x].enfermedad;
                                   var tipoEfecto=data.d[x].tipo_de_efecto;
                                   droga.insert(parte, efecto,tipoEfecto);
                               }
                            }
                            listaDrogas.push(droga);
                        }
                                                
                        for(var d in listaDrogas)
                        {
                            var show=listaDrogas[d];
                            //alert(show.nombre);
                            var now=show.partes.current;
                              for(var i=0;i<show.partes.size;i++)
                              {
                                  //alert(i+now.key+" "+now.value);
                                  window.localStorage.setItem(show.nombre+"-"+now.key,now.value);
                                  
                                  now=now.next;
                              }
                        }
                        
                        
                        
                        
                        
                
				nextUpdate.setMonth(today.getMonth() + 1);
				window.localStorage.setItem("nextUpdate",nextUpdate);
				 }).fail(function (data) 
				 {
				navigator.notification.alert("Error en la descarga de datos, vuelve a intentar más tarde",null,"Droog",'OK');

					  $.unblockUI();
			});
                
                  $.get("http://servicedatosabiertoscolombia.cloudapp.net/v1/Ministerio_de_Justicia/drogasinfo?&$format=json").
					done(function (data) {
                        $.unblockUI();
                        
                         for (var z in data.d) 
                        {   
                            var nombre=data.d[z].nombredeladroga;
                            var definicion=data.d[z].definicion;
                            window.localStorage.setItem("descripcion-"+nombre,definicion);
                            //alert(nombre+" :\n"+window.localStorage.getItem("descripcion-"+nombre));
                            
                        }
                        
                        
                        
                        }).fail(function (data) 
				 {
					//alert("Error en la descarga de datos, vuelve a intentar más tarde");
                   //   navigator.notification.alert("Error en la descarga de datos, vuelve a intentar más tarde",null,"Droog",'OK');
					  $.unblockUI();
			});
                
                
            
	
	};

function drug (nombre) {
    this.nombre = nombre;
    this.partes = new Map();
    this.insert = insert;
    this.efectosAgudos=undefined;
    this.efectosCronicos=undefined;
}
 
function insert(parte, efecto,tipoEfecto) 
{
     var efectos=this.partes.get(parte);
    var efectosAgudos=this.efectosAgudos;
    var efectosCronicos=this.efectosCronicos;
   
    if(tipoEfecto=="Agudo")
    {
           if(efectos===undefined)
           {   
                efecto="Efectos Agudos:\n"+efecto+"\n";
                this.partes.put(parte,efecto);
                this.efectosAgudos="1";
           }
            else if(efectosAgudos===undefined)
            {
                efecto="Efectos Agudos:\n"+efecto+"\n";
                efectos+=efecto;
                efectos+="\n";
                this.partes.remove(parte);
                this.partes.put(parte,efectos);
                this.efectosAgudos="1";
            }
        else if(efectosAgudos!==undefined)
        {      
                efectos+=efecto;
                efectos+="\n";
                this.partes.remove(parte);
                this.partes.put(parte,efectos);
        }
    }
    else if(tipoEfecto==="Crónico" || tipoEfecto==="Crónicos")
    {  
        if(efectos===undefined)
        {
            efecto="Efectos Crónicos:\n"+efecto+"\n";
            this.partes.put(parte,efecto);
             this.efectosCronicos="1";
        }
        else if(efectosCronicos===undefined)
        {           
                efecto="Efectos Crónicos:\n"+efecto;
                efectos+=efecto;
                efectos+="\n";
                this.partes.remove(parte);
                this.partes.put(parte,efectos);
                this.efectosCronicos="1";
        }
        else if(efectosCronicos!==undefined)
        {      
                efectos+=efecto;
                efectos+="\n";
                this.partes.remove(parte);
                this.partes.put(parte,efectos);
        }
    }
    
}

function normalizar(nombre)
{
    if(nombre=="sistema respiratorio")
    {
        alert("1");
        return "sistemarespiratorio";
    }
    else return nombre;

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
	

	app.verificarFechas = function()
	{
   	// navigator.notification.alert(
    // 'Eres el ganador!',      // mensaje (message)
    // null,      // función 'callback' a llamar con el índice del botón pulsado (confirmCallback)
    // 'Game Over',            // titulo (title)
    //     'Restart'          // botones (buttonLabels)
    //     );
   	
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
				$.get("http://yoreporto.herokuapp.com/twitter/tweets/", {"count": 20}, "json").
					done(function (data) {
					 $.unblockUI();
					//alert('downloaded');
					
					var nombre="nombredroga";
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
					}
				/*
				var lista = document.getElementById("tweets");
				for (x in data.tweets) {
					var trino = data.tweets[x].text;
					var image = data.tweets[x].profile_image_url;
					var el = document.createElement("il");
					var pe = document.createElement("p");
					pe.innerHTML = trino;
					var img = document.createElement("img");
					img.src = image;
					el.appendChild(img);
					el.appendChild(pe);
					lista.appendChild(el);
				*/
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
	

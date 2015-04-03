var total= 0;

$(document).ready(function(){

	$("a").click(function(){
		var padre = $(this); //la etiqueta a primera
		var hijo = $(this).children(); // el span o hijo de a
		val = hijo.html();
		val++;
		hijo.html(val);
		hermano = padre.next().next(); //el segundo hermano o la ultima etiqueda a que dice el precio
		precio = hermano.html();
		if(val == 1){
			
		total += parseInt(precio);
		$('#total').html("Total de sus pedidos: "+total);
		
		}
		if(val == 2){
		ok = precio*val;
		hermano.html(ok+".00");
		total += parseInt(precio);
		$('#total').html("Total de sus pedidos: "+total);
		}
		if(val >= 3){
			meno = val - 1;
			valor = precio/meno;
			nuevo = valor*val;
			hermano.html(nuevo+".00");
			total += valor;
			$('#total').html("Total de sus pedidos: "+total);
		}
		if(padre.attr("data-icon") === "delete"){// se verifica que es el boton borrar
			abuelo = $(padre.parent()[0]);// el papa de la primera etiqueta a
			val = abuelo.children().children().html(); // el papa llama a su hijo y el hijo llama a su hijo que es el span
			ohermano = abuelo.children().next().next(); // el papa llama a su hijo que llama a su ultimo o segundo hermano que es el precio
			precio = ohermano.html();
			if(val == 2){
				ok = precio/val;
				total -= ok;
				$('#total').html("Total de sus pedidos: "+total);
				ohermano.html(ok+".00");
				abuelo.children().children().html(val-1+".00");
			}
			if(val == 1){
				total -= parseInt(precio);
				$('#total').html("Total de sus pedidos: "+total);
				abuelo.children().children().html(val-1);	
			}
			if(val >= 3 ){
			res = val - 1;
			valor0 = precio/val;
			total -= valor0;
			$('#total').html("Total de sus pedidos: "+total);
			resul = valor0*res;
			ohermano.html(resul+".00");
			abuelo.children().children().html(val-1+".00");
			}
		}	
	});
	
	$("#enviar").click(function(){
		pedido = $("li a:first-child");
		cantidad = $("li span:first-child");
		precio = $("li a:last-child");
		create_database();
		for(var i = 0; i < cantidad.length; i++){
		
			if($(cantidad[i]).text() != "0"){
				
				console.log("Pedido: "+$(pedido[i]).text().split(" ", 1)[0]+" Cantidad:"+$(cantidad[i]).text()+" Precio: "+$(precio[i]).text());
				
			}
		
		}
//--------------------------------------------------------------------------------------
function populateDB(tx)
{
    tx.executeSql("CREATE TABLE IF NOT EXISTS Pedidos(id_pedidos INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario INTEGER NOT NULL, pedido VARCHAR(80) NULL, cantidad INTEGER NULL, precio FLOAT NULL, sucursal VARCHAR(80) NULL, fecha DATE DEFAULT CURRENT_DATE NULL)");
   	for(var i = 0; i < cantidad.length; i++){
		if($(cantidad[i]).text() != "0"){
			tx.executeSql('INSERT INTO Pedidos(id_usuario, pedido,cantidad,precio,sucursal) VALUES ((select ID from ID),"'+$(pedido[i]).text().split(" ", 1)[0]+'","'+$(cantidad[i]).text()+'","'+$(precio[i]).text()+'","'+$("#myselect option:selected").text()+'")');
			console.log("populateDB");
		}
	}
}

function queryDB(tx)
{
    tx.executeSql('SELECT * FROM comentarios',[],querrySuccess,errorCB);
	console.log("queryDB");
}

function querrySuccess(tx,results)
{
    var len = results.rows.length;
    //alert("test TABLE: "+ len +"row(s) found");
    for(var i=0;i<len;i++)
    {
        console.log("Row = " + i + " Usuario = " + results.rows.item(i).id_usuario + " Coment =  " + results.rows.item(i).comentario);
    }
}

function errorCB(err)
{
    alert("Error processing SQL"+err.code);
}

function successCB()
{
    //alert("Success!");
}

function create_database()
{
    var db = window.openDatabase("barrapayan.s3db","1.0", "Demo DB", 200000);
    db.transaction(populateDB,errorCB,successCB);
    db.transaction(queryDB,errorCB);
}
		
//----------------------------------------------------------------------------		
	});
	
	
});
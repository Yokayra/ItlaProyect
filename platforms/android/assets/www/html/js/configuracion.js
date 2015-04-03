function validarDatos(){
		
		 p = 0;
		
		 n = document.getElementById("nombre").value;
		if(!isNaN(n)){
			document.getElementById("p_1").innerHTML = "<font color=red>* este campo es solo para texto</font>"
			p++;
		}

		 c = document.getElementById("correo").value;
		var emailReg = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if(!emailReg.test(c)){
			document.getElementById("p_2").innerHTML = "<font color=red>* Escriba un correo valido</font>"
			p++;
		}
		
		 pass = document.getElementById("pass").value;
		var passReg = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,10})$/;
		if(!passReg.test(pass)){
			document.getElementById("p_3").innerHTML = "<font color=red>*(Este campo debe tener entre 8 y 10 caracteres, por lo menos un digito y un alfanumérico, y no puede contener caracteres espaciales)</font>"
			p++;
		}
		
		if(p == 0){
		
			create_database();
			
		}
		document.getElementById('nombre').setAttribute('onfocus','quitarV(document.getElementById("p_1"))');
		document.getElementById('correo').setAttribute('onfocus','quitarV(document.getElementById("p_2"))');
		document.getElementById('pass').setAttribute('onfocus','quitarV(document.getElementById("p_3"))');
		
	}
	function quitarV(id){
		id.innerHTML = "";
		
	}


function populateDB(tx)
{
	tx.executeSql('update Usuarios set nombre="'+$("#nombre").val()+'",correo="'+$("#correo").val()+'", password="'+$("#pass").val()+'" where id_usuario =(select ID from ID)');
	console.log("populateDB");
}

function queryDB(tx)
{
    tx.executeSql('SELECT id_usuario,correo FROM Usuarios where correo="'+$("#correo").val()+'" and id_usuario=(select ID from ID)',[],querrySuccess,errorCB);
	console.log("queryDB");
}

function querrySuccess(tx,results)
{
    var len = results.rows.length;
   //alert("test TABLE: "+ len +"row(s) found");
    for(var j=0;j<len;j++)
    {
        console.log("Row = " + j + " Usuario = " + results.rows.item(j).id_usuario + " Correo =  " + results.rows.item(j).correo);
    }
	if(len > 1){
		
		document.getElementById("p_2").innerHTML = "<font color=red>* Correo duplicado</font>";
	}
	if(len <= 1){
		
		db.transaction(populateDB,errorCB,successCB);
		
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
    db = window.openDatabase("barrapayan.s3db","1.0", "Demo DB", 200000);
    db.transaction(queryDB,errorCB);
}

function query(tx)
{
    tx.executeSql('SELECT nombre,correo,password FROM Usuarios where id_usuario=(SELECT ID FROM ID)',[],querry,errorCB);
	console.log("query");
}

function querry(tx,results)
{
    var len = results.rows.length;
    //alert("test TABLE: "+ len +"row(s) found");
    for(var j=0;j<len;j++)
    {
        console.log("Row = " + j + " Usuario = " + results.rows.item(j).nombre + " Correo =  " + results.rows.item(j).correo);
		document.getElementById("nombre").value = results.rows.item(j).nombre;
		document.getElementById("correo").value = results.rows.item(j).correo;
		document.getElementById("pass").value = results.rows.item(j).password;
    }
}

function cargarDatos(){

	db = window.openDatabase("barrapayan.s3db","1.0", "Demo DB", 200000);
	db.transaction(query,errorCB);

}
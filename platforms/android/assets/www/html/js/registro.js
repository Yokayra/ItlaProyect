function validarDatos(){
		
		 p = 0;
		
		 n = document.getElementById("nombre").value;
		if(!isNaN(n)){
			document.getElementById("p_1").innerHTML = "<font color=red>* este campo es solo para texto</font>"
			p++;
		}

		 i = document.getElementById("cedula").value;
		if(isNaN(i) || i.length < 11){
			document.getElementById("p_2").innerHTML = "<font color=red>* este campo es solo para 11 numeros</font>"
			p++;
		}

		 c = document.getElementById("correo").value;
		var emailReg = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if(!emailReg.test(c)){
			document.getElementById("p_3").innerHTML = "<font color=red>* Escriba un correo valido</font>"
			p++;
		}
		
		 pass = document.getElementById("pass").value;
		var passReg = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,10})$/;
		if(!passReg.test(pass)){
			document.getElementById("p_4").innerHTML = "<font color=red>*(Este campo debe tener entre 8 y 10 caracteres, por lo menos un digito y un alfanumérico, y no puede contener caracteres espaciales)</font>"
			p++;
		}
		
		if(p == 0){
		
			create_database();
			
		}
		document.getElementById('nombre').setAttribute('onfocus','quitarV(document.getElementById("p_1"))');
		document.getElementById('cedula').setAttribute('onfocus','quitarV(document.getElementById("p_2"))');
		document.getElementById('correo').setAttribute('onfocus','quitarV(document.getElementById("p_3"))');
		document.getElementById('pass').setAttribute('onfocus','quitarV(document.getElementById("p_4"))');
		
	}
	function quitarV(id){
		id.innerHTML = "";
		
	}


function populateDB(tx)
{
    //tx.executeSql('DROP TABLE IF EXISTS Usuarios');
    tx.executeSql("CREATE TABLE IF NOT EXISTS Usuarios(id_usuario INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nombre VARCHAR(60), correo VARCHAR(60) UNIQUE NOT NULL, password VARCHAR(10) NOT NULL, cedula INTEGER UNIQUE NOT NULL )");
    tx.executeSql('INSERT INTO Usuarios(nombre,correo,password,cedula) VALUES (?,?,?,?)',[$("#nombre").val(),$("#correo").val(),$("#pass").val(),$("#cedula").val()]);
	console.log("populateDB");
}

function queryDB(tx)
{
    tx.executeSql('SELECT * FROM Usuarios',[],querrySuccess,errorCB);
	console.log("queryDB");
}

function querrySuccess(tx,results)
{
    var len = results.rows.length;
    alert("test TABLE: "+ len +"row(s) found");
    for(var j=0;j<len;j++)
    {
        console.log("Row = " + j + " Usuario = " + results.rows.item(j).id_usuario + " Correo =  " + results.rows.item(j).correo);
    }
}

function errorCB(err)
{
    alert("Error processing SQL"+err.code);
}

function successCB()
{
    alert("Success!");
}

function create_database()
{
    var db = window.openDatabase("barrapayan.s3db","1.0", "Demo DB", 200000);
    db.transaction(populateDB,errorCB,successCB);
    db.transaction(queryDB,errorCB);
}
$("#enviar").click(function(){

	create_database();

});

function populateDB(tx)
{
    tx.executeSql("CREATE TABLE IF NOT EXISTS comentarios(ID INTEGER PRIMARY KEY AUTOINCREMENT, id_usuario INTEGER NOT NULL, comentario TEXT)");
    tx.executeSql('INSERT INTO comentarios(id_usuario,comentario) VALUES ((SELECT ID FROM ID),"'+$("#descripcion").val()+'")');
	console.log("populateDB");
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
	document.getElementById("lista").innerHTML += "<li><font color='red'>Usuario("+results.rows.item(len-1).id_usuario+"):</font> "+results.rows.item(len-1).comentario+"</li><br/>";
	$("#descripcion").val("");
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
    db.transaction(populateDB,errorCB,successCB);
    db.transaction(queryDB,errorCB);
}

function query(tx)
{
    tx.executeSql('SELECT * FROM comentarios',[],querry,errorCB);
	console.log("queryDB");
}

function querry(tx,results)
{
    var len = results.rows.length;
	document.getElementById("lista").innerHTML = "<li></li>";
    //alert("test TABLE: "+ len +"row(s) found");
    for(var i=0;i<len;i++)
    {
        console.log("Row = " + i + " Usuario = " + results.rows.item(i).id_usuario + " Coment =  " + results.rows.item(i).comentario);
		document.getElementById("lista").innerHTML += "<li><font color='red'>Usuario("+results.rows.item(i).id_usuario+"):</font> "+results.rows.item(i).comentario+"</li><br/>";
		$("#descripcion").val("");
	}
}

function cargarDatos(){

	db = window.openDatabase("barrapayan.s3db","1.0", "Demo DB", 200000);
	db.transaction(query,errorCB);

}
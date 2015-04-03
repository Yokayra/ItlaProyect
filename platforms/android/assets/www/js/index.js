$("#entrar").on("click",function(e){
	e.preventDefault();
	create_database();
});

function populateDB(tx)
{
    tx.executeSql('DROP TABLE IF EXISTS ID');
    tx.executeSql("CREATE TABLE IF NOT EXISTS ID(ID INTEGER PRIMARY KEY)");
    tx.executeSql('INSERT INTO ID(ID) VALUES ((select id_usuario from Usuarios where correo="'+$("#mail").val()+'" and password="'+$("#pass").val()+'"))');
	console.log("populateDB");
}

function queryDB(tx)
{
    tx.executeSql('SELECT correo,password from Usuarios where correo="'+$("#mail").val()+'" and password="'+$("#pass").val()+'"',[],querrySuccess,errorCB);
	
}

function querrySuccess(tx,results)
{
    len = results.rows.length;
	verificar = []
    alert("test TABLE: "+ len +"row(s) found");
    for(var i=0;i<len;i++)
    {
        console.log("Row = " + i + " Correo = " + results.rows.item(i).correo + " Password =  " + results.rows.item(i).password);
		verificar.push(results.rows.item(i).correo,results.rows.item(i).password);
    }
	if(len == 0){
		alert("Al parecer no esta registrado");
	}
	if(len > 0){
		location.href = $("#entrar").attr('href');
		alert(verificar);
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

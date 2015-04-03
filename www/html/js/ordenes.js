function queryDB(tx)
{
    tx.executeSql('SELECT *, (select nombre from Usuarios where id_usuario=(select ID from ID)) as nombre FROM Pedidos where id_usuario=(select ID from ID)',[],querrySuccess,errorCB);
	console.log("queryDB");
}

function querrySuccess(tx,results)
{
    var len = results.rows.length;
    //alert("test TABLE: "+ len +"row(s) found");
    for(var i=0;i<len;i++)
    {
        console.log("Row = " + i + " Usuario = " + results.rows.item(i).id_usuario + " Pedidos =  " + results.rows.item(i).pedido);
		document.getElementById("nombre").innerHTML = "Nombre: "+results.rows.item(i).nombre;
		document.getElementById("fc").innerHTML += "<tr><td>"+results.rows.item(i).pedido+"</td> <td>"+results.rows.item(i).cantidad+"</td> <td>"+results.rows.item(i).precio+"</td> <td>"+results.rows.item(i).sucursal+"</td> <td>"+results.rows.item(i).fecha+"</td></tr>";
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
    db.transaction(queryDB,errorCB);
}

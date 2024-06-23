initSqlJs({ locateFile: filename => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/${filename}` })
    .then(SQL => {
        let db = new SQL.Database(); // Создаём виртуальную базу данных
        db.exec("CREATE TABLE test (Name, Path); INSERT INTO test VALUES ('Bar#1', 'images/bar.png'), ('Bar#2', 'images/bar2.png'), ('Bar#3', 'images/image.png')"); // Заполняем таблицу тестовыми данными
        let stmt = db.prepare("SELECT * FROM test"); 

        const arr = [];

        while (stmt.step()){
            arr.push(stmt.get()); 
        } 
        //stmt.free(); // Освобождаем ресурсы после выполнения запроса

         const container = document.getElementById('image-container');
        
         for (let i = 0; i < arr.length; i += 1) {  
                const img = document.createElement('img');       
                img.src = arr[i][1];
                container.appendChild(img).classList.add('img-fluid','rounded', 'mh-25');
          }
    });
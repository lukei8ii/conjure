$("table#example tr.odd, table#example tr.even").each((index, element) => { 
    monsterList[index] = {}; 
    let data = $(element).find("td"); 
    monsterList[index].name = data.eq(0).text(); 
    monsterList[index].url = data.eq(0).find("a").attr("href"); 
    monsterList[index].size = data.eq(1).text(); 
    monsterList[index].type = data.eq(2).text(); 
    monsterList[index].alignment = data.eq(3).text(); 
    monsterList[index].cr = data.eq(4).text(); 
    monsterList[index].source = data.eq(5).text();

    $.ajax({
        url: `https://jsigvard.com/dnd/${monsterList[index].url}`,
        success: (data) => { monsterList[index].html = $(data).filter("div.container").first().html(); }
    });
})
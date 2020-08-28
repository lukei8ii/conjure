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


// https://sword-coast-legends.fandom.com/wiki/Giant_Wolf_Spider
// https://forgottenrealms.fandom.com/wiki/Langdedrosa_Cyanwrath
// https://www.dndbeyond.com/monsters/riding-horse
// https://www.aidedd.org/dnd/monstres.php?vo=aarakocra

[
    { url: "https://sword-coast-legends.fandom.com/wiki/", selector: "#mw-content-text > table.sclinfobox > tbody > tr:nth-child(2) > td > a > img", format: "snakeAndTitle" },
    { url: "https://forgottenrealms.fandom.com/wiki/", selector: "#pi-tab-0 > figure > a > img", format: "snakeAndTitle" },
    { url: "https://www.aidedd.org/dnd/monstres.php?vo=", selector: "div.bloc > div.picture > amp-img > img", format: "kebab" },
    { url: "https://www.dndbeyond.com/monsters/", selector: "#content > section > div > div.more-info.details-more-info > aside > div > a > img", format: "kebab" }
]

monsterList.forEach((monster, index) => {
    let creatureName = monster.name.replace(/ /g, "_");
    let imageUrl = `https://sword-coast-legends.fandom.com/wiki/${creatureName}`;

    $.get(imageUrl, (data) => { 
        let image = $(data).find("#mw-content-text > table.sclinfobox > tbody > tr:nth-child(2) > td > a > img").attr("src");
        monsterList[index].image = image;
    })
    .fail(function(error) { 
        console.log(error);
    });
})

monsterList.forEach((monster, index) => {
    let creatureName = monster.name.replace(/ /g, "_");
    let imageUrl = `https://forgottenrealms.fandom.com/wiki/${creatureName}`;

    $.get(imageUrl, (data) => { 
        let image = $(data).find("#pi-tab-0 > figure > a > img").attr("src");
        monsterList[index].image = monsterList[index].image || image;
    })
    .fail(function(error) { 
        console.log(error);
    });
})

monsterList.forEach((monster, index) => {
    let creatureName = monster.name.toLowerCase().replace(/ /g, "-");
    let imageUrl = `https://www.aidedd.org/dnd/monstres.php?vo=${creatureName}`;

    $.get(imageUrl, (data) => { 
        dataStuff = data;
        let image = $(data).filter("div.bloc").find("div.picture amp-img").attr("src");
        monsterList[index].image = monsterList[index].image || image;
    })
    .fail(function(error) { 
        console.log(error);
    });
})

monsterList.forEach((monster, index) => {
    let creatureName = monster.name.toLowerCase().replace(/ /g, "-");
    let imageUrl = `https://www.dndbeyond.com/monsters/${creatureName}`;

    $.get(imageUrl, (data) => { 
        let image = $(data).find("#content > section > div > div.more-info.details-more-info > aside > div > a > img").attr("src");
        monsterList[index].image = monsterList[index].image || image;
    })
    .fail(function(error) { 
        console.log(error);
    });
})
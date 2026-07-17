

if(localStorage.getItem("admin")!="true"){
    window.location="login.html";
}

function logout(){
    localStorage.removeItem("admin");
    window.location="login.html";
}

async function loadNews(category = "") {

    let url = "/newspapers";

    if (category) {
        url += "?category=" + category;
    }

    let response = await fetch(url);
    let data = await response.json();

    // Latest Editions
   let latestBox =
document.getElementById("latestUploads");

    if (latestBox) {

        let latest = data.slice(0, 3);

        latestBox.innerHTML = "";

        latest.forEach(news => {

            latestBox.innerHTML += `
            <div class="card">

                <h2>📰 ${news.newspaper}</h2>

                <p>${news.category}</p>

                <a href="pdf-viewer.html?pdf=${news.pdf}" target="_blank">
                    📖 Read Latest Edition
                </a>

            </div>
            `;
        });
    }

    let box = document.getElementById("newsList");

    box.innerHTML = "";

    data.forEach(news => {

        box.innerHTML += `
        <div class="card">

            <h2>📰 ${news.newspaper}</h2>

            <canvas
                id="thumb-${news.id}"
                class="thumb">
            </canvas>

            <p>Type : ${news.category}</p>

            <p>


<p>
RNI :
${news.rni || "-"}
</p>

<p>
Owner :
${news.owner || "-"}
</p>

<p>
📞 Mobile :
<a href="tel:${news.mobile}">
${news.mobile || "-"}
</a>
</p>

<p>
📧 Email :
<a href="mailto:${news.email}">
${news.email || "-"}
</a>
</p>

<p>
Editor :
${news.editor || "-"}
</p>

<p>
Publisher :
${news.publisher || "-"}
</p>

<p>
Volume :
${news.volume || "-"}
</p>

<p>
Issue :
${news.issue || "-"}
</p>
            <p>
                Date :
                ${new Date(news.date).toLocaleDateString()}
            </p>

            <a href="pdf-viewer.html?pdf=${news.pdf}" target="_blank">
                📖 Read Newspaper
            </a>

            <a href="/uploads/${news.pdf}" download>
                ⬇ Download PDF
            </a>

            <a
                href="https://wa.me/?text=Read%20${news.newspaper}%20Newspaper%20PDF"
                target="_blank">
                📲 Share WhatsApp
            </a>

        </div>
        `;

        setTimeout(() => {

            renderThumbnail(
                news.pdf,
                `thumb-${news.id}`
            );

        }, 100);

    });

}

loadNews();

async function loadByName(name) {

    let response = await fetch("/newspapers");

    let data = await response.json();

    data = data.filter(
        news => news.newspaper === name
    );

    let box = document.getElementById("newsList");

   box.innerHTML += `

<div class="card">

    <div class="card-header">
        📰 ${news.newspaper}
    </div>

    <div class="badge">
        ${news.category}
    </div>

    <canvas
        id="thumb-${news.id}"
        class="thumb">
    </canvas>

    <p><b>RNI :</b> ${news.rni || "-"}</p>

    <p><b>Owner :</b> ${news.owner || "-"}</p>

    <p><b>Mobile :</b> ${news.mobile || "-"}</p>

    <p><b>Email :</b> ${news.email || "-"}</p>

    <p><b>Editor :</b> ${news.editor || "-"}</p>

    <p><b>Publisher :</b> ${news.publisher || "-"}</p>

    <p><b>Volume :</b> ${news.volume || "-"}</p>

    <p><b>Issue :</b> ${news.issue || "-"}</p>

    <p>
        <b>Date :</b>
        ${new Date(news.date).toLocaleDateString()}
    </p>

    <div class="card-buttons">

        <a href="pdf-viewer.html?pdf=${news.pdf}"
           target="_blank"
           class="view-btn">
           📖 Read
        </a>

        <a href="/uploads/${news.pdf}"
           download
           class="view-btn">
           ⬇ Download
        </a>

    </div>

</div>

`;

function searchNews() {

    let value =
        document.getElementById("search")
        .value
        .toLowerCase();

    let cards =
        document.querySelectorAll(".card");

    cards.forEach(card => {

        let text =
            card.innerText.toLowerCase();

        if (text.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });function searchNews(){

let value =
document.getElementById("search")
.value.toLowerCase();

let cards =
document.querySelectorAll("#newsList .card");

cards.forEach(card=>{

let text =
card.innerText.toLowerCase();

card.style.display =
text.includes(value)
? "block"
: "none";

});

}

}

function searchDate() {

    let date =
        document.getElementById("dateSearch")
        .value;

    let cards =
        document.querySelectorAll(".card");

    cards.forEach(card => {

        if (date == "") {

            card.style.display = "block";
            return;

        }

        if (card.innerText.includes(date)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}

async function renderThumbnail(pdfFile, canvasId) {

    try {

        const pdf =
            await pdfjsLib.getDocument(
                "/uploads/" + pdfFile
            ).promise;

        const page =
            await pdf.getPage(1);

        const viewport =
            page.getViewport({
                scale: 0.35
            });

        const canvas =
            document.getElementById(canvasId);

        if (!canvas) return;

        const ctx =
            canvas.getContext("2d");

        canvas.width =
            viewport.width;

        canvas.height =
            viewport.height;

        await page.render({
            canvasContext: ctx,
            viewport: viewport
        }).promise;

    }
    catch (err) {

        console.log(err);

    }

}
function getRNI(name){

if(name==="Lokbharti")
return "MAHMAR/2026/001";

if(name==="Swabhimani Lok")
return "MAHMAR/2026/002";

if(name==="Loksanskruti")
return "MAHMAR/2026/003";

return "-";
}

function getOwner(name){

if(name==="Lokbharti")
return "Ram Nase";

if(name==="Swabhimani Lok")
return "ABC Patil";

if(name==="Loksanskruti")
return "XYZ Shinde";

return "-";
}

function getMobile(name){

if(name==="Lokbharti")
return "9876543210";

if(name==="Swabhimani Lok")
return "9876543211";

if(name==="Loksanskruti")
return "9876543212";

return "-";
}

function getEmail(name){

if(name==="Lokbharti")
return "lokbharti@gmail.com";

if(name==="Swabhimani Lok")
return "swabhimani@gmail.com";

if(name==="Loksanskruti")
return "loksanskruti@gmail.com";

return "-";
}
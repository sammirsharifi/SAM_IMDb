let API_KEY="k_3j5181mi";

function set_API_Key()
{
    API_KEY=document.getElementById('apikey').value;
    alert("API_KEY Set:"+API_KEY);
}

const request = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}

function set_similar_films(films_list){
    films_list.forEach(film=>{
        let recommend_film_poster_container_div=document.createElement("div");recommend_film_poster_container_div.className="recommend_film_poster_container";
        let image=document.createElement("img");image.src=film.image;recommend_film_poster_container_div.appendChild(image);
       
        let star_img=document.createElement("img");star_img.src="./images/star.jpg"
        let score_span = document.createElement("span");score_span.innerHTML=film.imDbRating
        let film_name=document.createElement("b");film_name.innerHTML=film.title;
        let film_name_div=document.createElement("div");film_name_div.className="recommend_film_info_name";film_name_div.appendChild(film_name)
        let film_info_div=document.createElement("div");film_info_div.className="recommend_film_info";
        film_info_div.appendChild(star_img);film_info_div.appendChild(score_span);film_info_div.appendChild(film_name_div);

        let recommend_film_div=document.createElement("div");recommend_film_div.className="recommend_film";recommend_film_div.appendChild(recommend_film_poster_container_div);recommend_film_div.appendChild(film_info_div);
        recommend_film_div.onclick=function(){show_movie_page(film.title)}
        document.getElementsByClassName("recommend_film_container")[0].appendChild(recommend_film_div);
    })
}

function clear_page()
{
    document.getElementById("tags").innerHTML=''
    document.getElementsByClassName("recommend_film_container")[0].innerHTML=''
}

function movie_page(movie_info){

    clear_page()
    document.getElementById("film_title").innerHTML = movie_info.title;
    document.getElementById("film_year_mins").innerHTML = movie_info.runtimeMins + "min  " + movie_info.year
    document.getElementById("score-val").innerHTML = movie_info.imDbRating
    document.getElementById("descript").innerHTML=movie_info.plot
    document.getElementById("directors").innerHTML=movie_info.directors
    document.getElementById("writers").innerHTML=movie_info.writers
    document.getElementById("stars").innerHTML=movie_info.stars
    document.getElementById("awards").innerHTML=movie_info.awards

    let genreList = movie_info.genres.split(",")
    genreList.forEach(element => {
        let x = document.createElement("SPAN");
        x.className="tag"
        x.innerHTML=element
        document.getElementById("tags").appendChild(x)
        
    });
    document.getElementById('cover').src=movie_info.image;
    const sliced_similar_films = movie_info.similars.slice(0, 4);
    set_similar_films(sliced_similar_films)
    

    


}
async function show_movie_page(movie_name){
    let search_film_url='https://imdb-api.com/en/API/SearchMovie/' + API_KEY + "/" + movie_name;
    let first_result= await request(search_film_url).then(data=>data.results)
    if(first_result.length==0){alert("No movie found.");return false;}
    film_id=first_result[0].id;
    let film_info_url="https://imdb-api.com/en/API/Title/" + API_KEY + "/"+ film_id
    let film_info=await request(film_info_url).then(data=>data)
    movie_page(film_info)
    
}

async function search_movie(movie_name)
{ //try{

    if(movie_name==null){
    movie_name=document.getElementById("search").value;}
    if(API_KEY==""){alert("please set an api key.");return false;}
    let search_film_url='https://imdb-api.com/en/API/SearchMovie/' + API_KEY + "/" + movie_name;
    let first_result= await request(search_film_url).then(data=>data.results)
    if(first_result.length==0){alert("No movie found.");return false;}
    film_id=first_result[0].id;
    let film_info_url="https://imdb-api.com/en/API/Title/" + API_KEY + "/"+ film_id
    let film_info=await request(film_info_url).then(data=>data)
    movie_page(film_info)

    


    //}
    //catch(err){alert(err)}
                 

    
}

import Axios from "../../node_modules/axios/index";
import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

import SweetModal from '../../node_modules/sweet-modal-vue/src/plugin.js'





let url = 'https://mywebappproject.azurewebsites.net/api/music'

interface IMusic {
    
    title: string,
    artist: string,
    duration: number,
    yearOfPublication: number,
}





new Vue({
    // TypeScript compiler complains about Vue because the CDN link to Vue is in the html file.
    // Before the application runs this TypeScript file will be compiled into bundle.js
    // which is included at the bottom of the html file.
    el: "#app",
    data: {
        songlist: [],
        formdata: {title: "", artist: "", duration: "", yearOfPublication: ""},
        title: "",
        song: null,
        deleteTitle: "",
        
        duration: "",
        yearOfPublication: "",

        







    },
    methods: {
        async GetAllSongsAsync(){
            try{return axios.get<IMusic[]>(url)}
            catch (error: AxiosError) {
                this.message = error.message;
                alert(error.message)}
        },

        async GetAllSongs(){
            let response = await this.GetAllSongsAsync();
            this.songlist = response.data;

        },

        async GetSongByTitleAsync(Title: string){
            try{return axios.get<IMusic>(url+'/'+ Title)
            .then((response: AxiosResponse<IMusic>) => {this.song = response.data; console.log(this.song)})}

                                    
        },

        async AddSongAsync(){
            try{ return Axios.post<IMusic>(url,this.formdata)
              
            }
            
            catch (error: AxiosError) {
                this.addMessage = error.message
                console.log("message" + error.message);
                alert(error.message)
            }
        },

        async AddSong(){
            let response = await this.AddSongAsync();
            this.formdata.title = "title: " + JSON.stringify(response.data);
            this.formdata.artist = "artist: " + JSON.stringify(response.data);
            this.duration = "duration: " + JSON.stringify(response.data);
            this.yearOfPublication = "yearOfPublication: " + JSON.stringify(response.data);
            
         },

         UpdateSong(){
            
            axios.put<IMusic>(url+'/'+this.formdata.title, this.formdata)
            
            
            .catch((error: AxiosError) => {
                alert(error.message)
            })
        
            this.formdata.title = "";
            this.formdata.artist = "";
            this.formdata.duration = "";
            this.formdata.yearOfPublication = "";
        
        },

        DeleteSong(){
            axios.delete<IMusic>(url+'/'+this.deleteTitle)
            
        },

        


        


         

        


    }
    

})

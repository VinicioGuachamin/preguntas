import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AlertController} from '@ionic/angular';
import {PreguntaService} from '../servicios/pregunta.service';
import {Historial} from '../clases/historial';
import {Storage} from '@ionic/storage';
import {HistorialService} from '../servicios/historial.service';
import {NavigationExtras} from '@angular/router';
import * as $ from 'jquery'



@Component({
    selector: 'app-pregunta',
    templateUrl: './pregunta.page.html',
    styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

    preguntaAbierta: number = 1;
    numPreguntas: number = 3;
    preguntas: any = [];
    itemPregunta: any = {
        id: '',
        descripcion: '',
        imagen: '',
        pregunta_abierta: '',
        resolucion: ''
    };
    preguntaActual: number = 0;
    respuestasCorrectas: number = 0;
    showSiguiente: boolean = false;
    buttonDisable: boolean = true;
    respuestas: any = [];
    auxCorrect: any = "";
    auxIncorrect: any = "";
    idSelected: any = "";
    showFinalizar: boolean = false;
    porcentaje: number = 0.75;
    historial: Historial = {
        idUsuario: "",
        nota: "",
        aciertos: "",
        fallos: ""
    }
    usercorrect: any;

    constructor(private navCtrl: NavController,
                private alertCtrl: AlertController,
                private srvPregunta: PreguntaService,
                private srvHistorial: HistorialService,
                private storage: Storage) {

    }

     ngOnInit() {
        this.GetUserCurrent();
        this.storage.get('abierta').then( (val) => {
            console.log(val);
            this.srvPregunta.GetPreguntas(val == "SinLogueo" ? 0 : 1, this.numPreguntas).subscribe(resp => {
                console.log(JSON.parse(resp));
                this.preguntas = JSON.parse(resp);
                if (this.preguntas.message === "No record found."){
                    console.log("aaaaaaaa")
                    this.MensajeNoPreguntas();
                    this.storage.clear();
                }
                console.log(this.preguntas);
                console.log(this.preguntas.length);
                this.itemPregunta = this.preguntas[this.preguntaActual];
                console.log(this.itemPregunta);
                this.GetRespuestasById(this.itemPregunta.id);

                if (val == "SinLogueo"){
                    this.storage.clear();
                }
            });
        });

    }

    async MensajeNoPreguntas() {
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Disculpas',
            message: 'Actualmente no existen preguntas, inténtelo más tarde',
            buttons: [
                {
                    text: 'Ok',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        this.navCtrl.navigateRoot('login');
                    }
                }
            ]
        });

        await alert.present();
    }

    GetUserCurrent(){
        this.storage.get('user').then ((val)=>{
            this.usercorrect = JSON.parse(val);
            console.log(this.usercorrect);
        });
    }

    GetRespuestasById(id: any) {
        this.srvPregunta.GetRespuestaById(id).subscribe(resp => {
            console.log(JSON.parse(resp));
            if (JSON.parse(resp).message == "No record found."){
                this.respuestas = [];
            }else {
                this.respuestas = JSON.parse(resp);
            }

        })
    }

    async FinalizarCuestionario(){
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Confirmación',
            message: '¿Finalizar el cuestionario?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log();
                    }
                }, {
                    text: 'Aceptar',
                    handler: () => {
                        if (this.usercorrect == null){
                            this.navCtrl.navigateRoot('login');
                        }else {
                            this.navCtrl.navigateRoot('perfil');
                        }

                        console.log('Aceptar');
                    }
                }
            ]
        });

        await alert.present();
    }

    VerSolucion() {
        let data: NavigationExtras = {
            state: this.itemPregunta
        }
        this.navCtrl.navigateForward('/solucion-pregunta', data);
    }

    async VerificarRespuesta() {

        this.showSiguiente = !this.showSiguiente;
        if (this.showSiguiente == false) { // Evento boton Siguiente
            this.preguntaActual++;
            this.itemPregunta = this.preguntas[this.preguntaActual];
            this.GetRespuestasById(this.itemPregunta.id);
            this.ResetVariables();
            setTimeout(()=>{
                $('#btnNext').prop('disabled', true);
            },400)
        }else {  // Evento botón Validar Respuesta
            let respCorrect = this.respuestas.find(x => x.correcta == "1");
            let respActual = this.respuestas.find(x => x.id == this.idSelected);

            if (respActual.correcta == "1"){ // Si la respuesta seleccionada es correcta
                this.auxCorrect = this.idSelected;
                this.respuestasCorrectas++; // Voy sumando el puntaje de las respuestas correctas
            }else { // Si la respuesta seleccionada es incorrecta
                this.auxIncorrect = this.idSelected;
                this.auxCorrect = respCorrect.id;
            }

            if (this.preguntaActual == (this.preguntas.length -1) ){ // Cuando se acaban las preguntas muestro el botón Finalizar
                this.showFinalizar = true;
            }
        }
    }

    ResetVariables() {
        this.auxIncorrect = "";
        this.auxCorrect = "";
        this.idSelected = "";
        this.buttonDisable = true;
    }

    RadioGroupChange(event){
        $('#btnNext').prop('disabled', false);
        this.buttonDisable = false;
        this.idSelected = event.detail.value;
    }

    async VerNota(){
       // alert("La nota es " + this.respuestasCorrectas + "/" + this.preguntas.length);
        let notaFinal = this.usercorrect != null ?
            (((Number(this.respuestasCorrectas)*600)/89) + ((Number(this.usercorrect.nota_grado)*400)/10)).toFixed(2) :
            this.respuestasCorrectas + "/" + this.preguntas.length;
        const alert_1 = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Puntaje:',
            message: ("Su nota es " + notaFinal),
            buttons: [
                {
                    text: 'Aceptar',
                    handler: () => {
                        this.navCtrl.navigateRoot('perfil');
                        console.log('Aceptar');
                        if (this.usercorrect != null){
                            this.historial.idUsuario = this.usercorrect.id;
                            this.historial.aciertos = this.respuestasCorrectas;
                            this.historial.fallos = Number(this.preguntas.length) - Number(this.respuestasCorrectas);
                            this.historial.nota =  notaFinal; // TO DO: Aqui va la nota debemos aplicar algún promedio
                            console.log(this.historial);
                            this.srvHistorial.SaveRespuestas(this.historial).subscribe( resp =>{
                                console.log(resp);
                                if (resp == 1) {
                                    // if (this.usercorrect == null){
                                    //     this.navCtrl.navigateRoot('login');
                                    // }else {
                                        this.navCtrl.navigateRoot('perfil');
                                    // }
                                }else {
                                    alert("Error al ingresar");
                                }
                            });
                        }else {
                            this.navCtrl.navigateRoot('login');
                        }


                    }
                }
            ]
        });

        await alert_1.present();
    }
}

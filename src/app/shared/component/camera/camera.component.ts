import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Camera} from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";
import {CameraPreview} from "@capacitor-community/camera-preview";

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss'
})
  
export class CameraComponent implements OnInit {

  cameraPermission: boolean = false;
  
  @Output() image: EventEmitter<File> = new EventEmitter<File>();

  ngOnInit(): void {
    this.checkPermissions().then(() => {
      if (this.cameraPermission) {
        CameraPreview.start({
          parent: "cameraPreview", // Id de l'élément HTML où afficher la caméra
          position: "rear", // Position de la caméra (front ou rear)
          width: 500,
          height: 500,
        });
      }
    });
  }

  // Vérifier les permissions de la caméra
  async checkPermissions() {
    if (Capacitor.getPlatform() !== 'web') { // Demander le consentement si l'application n'est pas sur le web
      const permissions = await Camera.checkPermissions(); // Vérifier les permissions de la caméra

      if (permissions.camera === 'prompt') {
        const auth = await Camera.requestPermissions(); // Demander les permissions de la caméra
        if (auth.camera === 'granted') {
          this.cameraPermission = true;
        }
      }else if (permissions.camera === 'granted') {
        this.cameraPermission = true;
      }
    }else{
      this.cameraPermission = true;
    }
  }

  //---------------------- Envoie de l'image capturée au composant parent ----------------------  
  // Prendre et traiter une photo
  async takePicture() {
    // Prendre une photo
    CameraPreview.capture({
      quality: 90,
      width: 500,
      height: 500,
    }).then((image) => {
      // Convertir l'image en fichier
      const file = this.base64ToFile(this.fixBase64(image.value), 'captured_image.png');
      if (file){
        // Envoyer l'image au composant parent
        this.image.emit(file);
      }
    });
  }

  // Vérifier et corriger le format de l'image
  fixBase64(base64: string): string {
    // Ensure the base64 string starts with the correct data URI scheme
    if (!base64.startsWith('data:image/png;base64,')) {
      base64 = 'data:image/png;base64,' + base64;
    }
    return base64;
  }

  // Convertir une image base64 en fichier
  base64ToFile(base64: string, filename: string): File | undefined {
    const arr = base64.split(',');
    const arrMatch = arr[0].match(/:(.*?);/);
    if (arrMatch && arrMatch.length >= 1) {
      const mime = arrMatch[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }
    return;
  }

}
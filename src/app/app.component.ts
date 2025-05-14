import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CameraComponent } from "./shared/component/camera/camera.component";
import {PicService} from "./shared/service/pic.service";
import {Prediction} from "./shared/interface/prediction";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CameraComponent], // Importer le composant de la caméra ici
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'whos-that-pokemon';

  predictions: Prediction[] = [];
  isLoading = false;

  constructor(
    private predictionService: PicService // Injecter le service de prédiction
  ) {}

  // Récupérer les prédictions
  getPredictions(file: File): void {
    // Afficher le spinner de chargement
    this.isLoading = true;
    // Appeler le service de prédiction
    this.predictionService.predict(file).subscribe(
      // Traiter la réponse
      (response: Prediction[]) => {
        this.isLoading = false;
        this.predictions = response;
      },
      // Gérer les erreurs
      (error) => {
        this.isLoading = false;
        console.error('Error:', error);
      }
    );
  }

}
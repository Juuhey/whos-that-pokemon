import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PicService {
  private apiUrl = 'https://pic.marill.dev/predict'; // Remplace par l'URL de ton backend
  private apiKey = '7inzhNCSdjmfNHJVi5zsJU3weDTjQaR6p3ENkMXHVLPQYTAET9mkocDyXvJ3JDaSTKLTbMwgUKyPpJMenC7X'; // Remplace par la clé d'API

  constructor(private http: HttpClient) { }

  // Fonction pour envoyer une image à l'API de prédiction
  predict(file: File): Observable<any> {

    // Création d'un objet FormData pour envoyer le fichier
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    // Envoi de la requête POST vers l'API de prédiction
    return this.http.post<any>(this.apiUrl, formData, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Api-key '+this.apiKey
      }
    });
  }
}
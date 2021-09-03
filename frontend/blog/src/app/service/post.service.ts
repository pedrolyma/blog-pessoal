import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from '../model/Post';
import { EMPTY, Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  url = 'http://localhost:3000/posts'

  constructor(private httpClient: HttpClient) { }

  getPosts(): Observable<PostModel[]> {
    return this.httpClient.get<PostModel>(this.url)
    .pipe(
      map((response) => response),
      catchError((e) => this.errorHandler(e))
    );
  }

  postMensagem(postModel: PostModel) {
    return this.httpClient.post(this.url, postModel)
  }

  errorHandler(e: any): Observable<any> {
    alert("Ocorreu um erro!");
    return EMPTY;
  }
}

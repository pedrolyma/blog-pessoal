import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModel } from '../model/Post';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  listPost: PostModel[] = [];
  post: any; //PostModel = new PostModel;
  _filterBy: string = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
     this.findPosts();
  }

  findPosts(): void {
    this.postService.getPosts().subscribe(dados => {
      this.listPost = dados;
    });
  }

  cadastrarMensagem() {
    this.postService.postMensagem(this.post).subscribe(dados => {
      this.post = dados;
      location.assign('/feed')
    })
  }

  // quando digita
  set filter(value: string) { 
    this._filterBy = value;

    this.listPost = this.post.filter((postModel: PostModel) => postModel.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1);
}
// quando retorna
get filter() { 
    return this._filterBy;
}


}

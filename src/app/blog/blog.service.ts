import { Injectable } from '@angular/core';
import { Post } from './post';
import { Posts } from './mock-posts';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }
  getPosts() {
    return this.http.get(this.postsUrl)
  }
  getNumPosts() {
    return this.http.get(this.postsUrl + 'numPosts/')
  }
  
  private postsUrl = environment.expressUrl + '/blog/';

}


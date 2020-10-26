import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';

import { Post } from './post';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }
  // getPosts() {
  //   return this.http.get(this.postsUrl)
  // }

  loadPosts(limit: number): Observable<any[]>  {
    return this.firestore.collection("blogPosts", ref =>
      ref.limit(limit).orderBy('datets', 'desc')).snapshotChanges()
  }

  loadAfter(lastInResponse: any[], limit: number) {
    return this.firestore.collection("blogPosts", ref =>
      ref.limit(limit).orderBy('datets', 'desc').startAfter(lastInResponse)).get()
  }

  loadAt(prevStartAt: any[], limit: number) {
    return this.firestore.collection("blogPosts", ref =>
      ref.limit(limit).orderBy('datets', 'desc').startAt(prevStartAt)).get()
  }

  hasNext(startAt: any[]) {
    return this.firestore.collection("blogPosts", ref =>
      ref.limit(1).orderBy('datets', 'desc').startAfter(startAt)).get()
  }

  createPost(data) {
    return this.firestore.collection("blogPosts").add(data);

  }
  
  private postsUrl = environment.expressUrl + '/blog/';

  form = new FormGroup({        
    title: new FormControl('', Validators.minLength(2)),
    datets: new FormControl(''),
    message: new FormControl('', Validators.minLength(2))
})


}


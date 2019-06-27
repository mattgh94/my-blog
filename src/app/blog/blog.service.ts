import { Injectable } from '@angular/core';
import { Post } from './post';
import { Posts } from './mock-posts';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor() { }
  getPosts(): Post[] {
    return Posts;
  }
  getNumPosts(): number {
    return Posts.length;
  }
}


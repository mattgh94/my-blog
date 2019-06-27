import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  posts: Post[];
  selectedPost: Post;
  page: number;
  pageSize: number;
  numPosts: number;


  getPosts(): void {
    this.posts = this.blogService.getPosts();
    this.numPosts = this.blogService.getNumPosts();
  }

  selectPost(post: Post): void {
    this.selectedPost = post;
  }

  ngOnInit() {
    this.pageSize = 8;
    this.page = 1;
    this.getPosts();
  }

}

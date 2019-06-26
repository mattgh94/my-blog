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
  posts2: Post[] = [
    {message: "hello", datets: "date 1"},
    {message: "hello2", datets: "date 2"},
  ];
  selectedPost: Post;

  selectPost(sPost: Post): void {
    this.selectedPost = sPost;
  }

  getPosts(): void {
    this.posts = this.blogService.getPosts();
  }
  ngOnInit() {
    this.getPosts();
  }

}

import { Component, OnInit } from '@angular/core';
import { Post } from './post';
import { BlogService } from './blog.service';
import { Posts } from './mock-posts';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  posts: Post[];
  selectedPost: Post;
  page: number;
  pageSize: number;
  numPosts: number;


  getPosts(): void {
    this.blogService.getPosts().subscribe((data: Post[]) => 
      this.posts = data
    );
    this.blogService.getNumPosts().subscribe((numPost: number) => 
      this.numPosts = numPost
    );
  }

  selectPost(post: Post): void {
    this.selectedPost = post;
  }

  ngOnInit() {
    this.pageSize = 3;
    this.page = 1;
    this.getPosts();
  }

}

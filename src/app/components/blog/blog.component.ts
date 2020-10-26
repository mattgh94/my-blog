import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';


import { Post } from './post';
import { BlogService } from './blog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(private blogService: BlogService, private datepipe: DatePipe) { 


  }

  posts: any[] = [];
  selectedPost;
  pageSize: number;
  numPosts: number;

  //Save first document in snapshot of items received
  firstInResponse: any = [];

  //Save last document in snapshot of items received
  lastInResponse: any = [];

  //Keep the array of first document of previous pages
  prev_strt_at: any = [];

  //Maintain the count of clicks on Next Prev button
  pagination_clicked_count: number;

  //Disable next and prev buttons
  disable_next: boolean = false;
  disable_prev: boolean = false;


  hideForm: boolean;
  currentDate: Date;

  newPost = [];


  toggleForm() {
    this.hideForm = !this.hideForm;
  }


  // getPosts(): void {
  //   this.blogService.getPosts().subscribe((data: Post[]) => 
  //     this.posts = data
  //   );
  //   this.blogService.getNumPosts().subscribe((numPost: number) => 
  //     this.numPosts = numPost
  //   );
  // }

  loadPosts(): void {
    this.blogService.loadPosts(this.pageSize).subscribe(res => {
      if (!res.length) {
        console.log("No Data Available");
        return false;
      }

      this.firstInResponse = res[0].payload.doc;
      this.lastInResponse = res[res.length - 1].payload.doc;

      this.posts = [];

      // create posts from res
      for (let item of res) {
        this.posts.push(item.payload.doc.data());
      }

      //Initialize values
      this.prev_strt_at = [];
      this.pagination_clicked_count = 0;

      this.checkForNext();
      this.disable_prev = true;


    });
  }

  nextPage(): void {
    this.blogService.loadAfter(this.lastInResponse, this.pageSize).subscribe(res  => {
      if (!res.docs.length) {
        this.disable_next = true;
        return;
      }

      this.prev_strt_at.push(this.firstInResponse);

      this.firstInResponse = res.docs[0];
      this.lastInResponse = res.docs[res.docs.length - 1];


      this.posts = [];

      // create posts from res
      for (let item of res.docs) {
        this.posts.push(item.data());
        console.log("test");
      }

      this.pagination_clicked_count++;

      this.checkForNext();
      this.disable_prev = false;
  
      }, error => {
        this.disable_next = false;
      });
  }

  prevPage(): void {
    if (this.pagination_clicked_count > 0){
      this.blogService.loadAt(this.prev_strt_at.pop(), this.pageSize).subscribe(res  => {
        if (!res.docs.length) {
          this.disable_next = true;
          return;
        }

        this.firstInResponse = res.docs[0];
        this.lastInResponse = res.docs[res.docs.length - 1];

        this.posts = [];

        // create posts from res
        for (let item of res.docs) {
          this.posts.push(item.data());
        }

        this.pagination_clicked_count--;

        //Enable buttons again
        if (this.pagination_clicked_count == 0)
        {
          this.disable_prev = true;
        }
        else{ this.disable_prev = false; }

        this.disable_next = false;
      }, error => {
        this.disable_prev = false;
      });
    }
  }

  checkForNext() {
    this.blogService.hasNext(this.lastInResponse).subscribe(res => {
      if (!res.docs.length) {
        this.disable_next = true;
        return;
      }
      else {
        this.disable_next = false;
        return;
      }
    })
  }

  selectPost(post: Post): void {
    this.selectedPost = post;
  }

  ngOnInit() {
    this.pageSize = 3;
    this.pagination_clicked_count = 0;
    this.loadPosts();
    this.hideForm = true;
  }

  onSubmit() {

    this.currentDate = new Date();

    this.blogService.form.value.datets = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd H:mm:ss');
    let data = this.blogService.form.value;

    this.blogService.createPost(data).then(res => {

    });
  }


}

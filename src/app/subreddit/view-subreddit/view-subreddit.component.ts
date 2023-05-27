import { Component, OnInit } from '@angular/core';
import { SubredditService } from '../subreddit.service';
import { PostModel } from 'src/app/shared/post-model';
import { ActivatedRoute } from '@angular/router';
import { SubredditResponse } from '../subreddit-response';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit {
  posts!: Array<PostModel>;
  id!: number;
  subreddit!: SubredditResponse;
  constructor(private subredditService: SubredditService,private activateRoute: ActivatedRoute) { 
    this.id = this.activateRoute.snapshot.params['id'];
  } 

  ngOnInit(): void {
      this.getSubreeditInfo();
      this.getSubredditPosts();
  }

  getSubreeditInfo(){
    this.subredditService.getSubredditById(this.id).subscribe((data)=>{
      this.subreddit = data
      console.log(data);
    })
  }

  getSubredditPosts()
  {
    this.subredditService.getSubredditPosts(this.id).subscribe((data)=>{
      this.posts = data
    })
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubredditResponse } from './subreddit-response';
import { PostModel } from '../shared/post-model';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditResponse>> {
    return this.http.get<Array<SubredditResponse>>('http://localhost:8080/api/subreddits');
  }

  createSubreddit(subredditModel: SubredditResponse): Observable<SubredditResponse> {
    return this.http.post<SubredditResponse>('http://localhost:8080/api/subreddits',
      subredditModel);
  }

  getSubredditById(id:number): Observable<SubredditResponse> {
    return this.http.get<SubredditResponse>(`http://localhost:8080/api/subreddits/${id}`);
  }

  getSubredditPosts(id:number): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`http://localhost:8080/api/subreddits/${id}/posts`)
  }
}

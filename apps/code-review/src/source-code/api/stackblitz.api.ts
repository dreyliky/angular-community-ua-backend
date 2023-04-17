import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class StackblitzApi {
    constructor(private readonly httpService: HttpService) {}

    public getStackblitzHtml(stackblitzUrl: string): Observable<string> {
        return this.httpService.get<string>(stackblitzUrl).pipe(map((response) => response.data));
    }
}

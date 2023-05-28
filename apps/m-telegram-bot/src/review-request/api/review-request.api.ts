import { ReviewRequestCreationDto, ReviewRequestDto } from '@acua/shared/code-review';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { ENVIRONMENT_KEY } from '../../data';

@Injectable()
export class ReviewRequestApi {
    private readonly backendUrl = this.configService.get(ENVIRONMENT_KEY.CodeReviewBackUrl);

    constructor(
        private readonly http: HttpService,
        private readonly configService: ConfigService
    ) {}

    public async getById(id: string): Promise<ReviewRequestDto> {
        const request$ = this.http.get<ReviewRequestDto>(
            `${this.backendUrl}/review-requests/${id}`
        );
        const response = await firstValueFrom(request$);

        return response.data;
    }

    public async create(data: ReviewRequestCreationDto, bearerToken: string): Promise<string> {
        const request$ = this.http.post<{ id: string }>(
            `${this.backendUrl}/review-requests`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${bearerToken}`
                }
            }
        );

        const response = await firstValueFrom(request$);

        return response.data.id;
    }
}

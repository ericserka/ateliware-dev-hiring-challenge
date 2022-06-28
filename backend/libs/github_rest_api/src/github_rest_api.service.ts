import {
  ExternalApiRequestParams,
  ExternalApiRequestService,
} from '@app/external-api-request';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GithubRestApiService {
  constructor(private externalApiRequestService: ExternalApiRequestService) {}

  async searchRepositories(language: string, page: number) {
    return this.makeGithubApiRequest({
      method: 'get',
      url: `/search/repositories?q=language:${language}&sort=stars&order=desc&page=${page}`,
    });
  }

  private async makeGithubApiRequest({
    ...rest
  }: Omit<ExternalApiRequestParams, 'baseURL'>) {
    return this.externalApiRequestService.makeAxiosRequest({
      ...rest,
      baseURL: process.env.GITHUB_REST_API_ENDPOINT,
    });
  }
}

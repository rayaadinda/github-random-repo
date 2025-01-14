import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StarIcon, RepoForkedIcon, MarkGithubIcon, AlertIcon } from '@primer/octicons-react';

const RepoCard = ({ repo }) => {
  if (!repo) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-black hover:underline flex items-center gap-2">
            <MarkGithubIcon size={16} />
            {repo.name}
          </a>
        </CardTitle>
        <CardDescription>{repo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Owner:</span>
            <a href={repo.owner.html_url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:underline">
              {repo.owner.login}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Language:</span>
            <span className="text-sm text-gray-600">{repo.language}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <StarIcon size={16} />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <RepoForkedIcon size={16} />
            <span>{repo.forks_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <AlertIcon size={16} />
            <span>{repo.open_issues_count}</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Created: {new Date(repo.created_at).toLocaleDateString()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default RepoCard;

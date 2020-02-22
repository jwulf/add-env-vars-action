<p align="center">
  <a href="https://github.com//jwulf/add-env-vars-action/actions"><img alt="typescript-action status" src="https://github.com//jwulf/add-env-vars-action/workflows/build-test/badge.svg"></a>
</p>

# Globally set env vars that use context variables

See this StackOverflow question: ["GitHub Actions: env: Use pre-defined environment variables on RHS within env section"](https://stackoverflow.com/questions/60347162/github-actions-env-use-pre-defined-environment-variables-on-rhs-within-env-secA).

> I would like to declare some environment variables in a top level env section in my main.yml whose values use some pre-defined environment variables such as those documented in the GitHub Actions documentation. However, it appears I cannot use those pre-defined variables in the right hand side of my env section. For example:

```
env:
  resourceGroup: ${GITHUB_RUN_ID}${GITHUB_RUN_NUMBER}
```
> Is there a way to make it so any step that needs ${resourceGroup} can get it without having to manually define it within each step?

## Now you can!

Use this action as the first step in your workflow, and pass in the JSON-stringified map of env vars that you want set for all steps in the workflow.

```
jobs:
  foo:
    runs-on: ubuntu-latest
    steps:
      - name: Setup env
        uses: jwulf/add-env-vars-action@master
        with:
          map: '{"resourceGroup1": "${{ github.run_id }}-${{ github.run_number }}", "resourceGroup2": "${{ github.run_id }}-${{ github.run_number }}"}'
      - name: test1
        run: echo ${{ env.resourceGroup1 }}
      - name: test2
        run: echo ${{ env.resourceGroup2 }}
```
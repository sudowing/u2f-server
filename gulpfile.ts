import * as gulp from 'gulp'
import * as nodemon from 'gulp-nodemon'
import * as ts from 'gulp-typescript'
import * as sourcemaps from 'gulp-sourcemaps'

declare module 'gulp-sourcemaps' {
  interface WriteOptions {
    mapSources: Function
  }
}

const tsProject = ts.createProject('tsconfig.json')

gulp.task('typescript', () => {
  const tsResult = gulp.src(['./**/*.ts', '!src/**/*.spec.ts', '!gulpfile.ts', '!node_modules/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(tsProject())

  return tsResult.js
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: '',
      mapSources: sourcePath => `../src/${sourcePath}`
    }))
    .pipe(gulp.dest('./bin'))
})

gulp.task('default', ['typescript'], () => {
  return nodemon({
    execMap: {
      js: 'node --inspect -r source-map-support/register'
    },
    script: 'bin/src/app.js',
    watch: ['src'],
    ext: 'ts',
    tasks: ['typescript'],
    legacyWatch: true
  })
})

# 🌿 감성 일기장 (Warm & Cozy Diary PWA)

따뜻하고 아늑한 분위기에서 하루를 기록할 수 있는 모바일 우선 웹 애플리케이션입니다.

## ✨ 주요 기능
- **일기 작성:** 텍스트와 함께 오늘의 기분(이모지)을 선택하고 사진을 첨부할 수 있습니다.
- **로컬 저장:** 모든 데이터는 브라우저의 IndexedDB에 안전하게 저장됩니다 (서버 필요 없음).
- **보안 기능:** 4자리 PIN 번호로 나만의 일기장을 보호할 수 있습니다.
- **PWA 지원:** 오프라인에서도 작동하며, 휴대폰 홈 화면에 추가하여 앱처럼 사용할 수 있습니다.
- **감성 디자인:** 부드러운 베이지/브라운 톤과 편안한 서체를 사용하여 따뜻한 느낌을 줍니다.

## 🚀 시작하기

이 프로젝트를 로컬에서 실행하거나 빌드하려면 Node.js가 설치되어 있어야 합니다.

1. **의존성 설치:**
   ```bash
   npm install
   ```

2. **개발 서버 실행:**
   ```bash
   npm run dev
   ```

3. **프로젝트 빌드:**
   ```bash
   npm run build
   ```

## 📦 GitHub에 올리는 방법

1. GitHub에서 새로운 저장소(Repository)를 생성합니다.
2. 현재 폴더에서 다음 명령어를 실행합니다:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Cozy Diary PWA"
   git branch -M main
   git remote add origin [여기에_자신의_저장소_주소_복사]
   git push -u origin main
   ```

## 🛠 기술 스택
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS, Framer Motion (애니메이션)
- **Database:** Dexie.js (IndexedDB wrapper)
- **PWA:** vite-plugin-pwa
- **Icons:** Lucide React

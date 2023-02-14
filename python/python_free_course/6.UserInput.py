# ============
# ? input(질문) 을 이용하면 커맨드 라인에서 사용자 input을 받을 수 있다.
# ============

name = input('What is your name?: ')
age = int(input('How old are you?: '))
height = float(input('How tall are you?: '))

print('Hello {}'.format(name))
print('당신은 대략 만 {} 세 입니다.'.format(age -1))
print('키는 {}cm 이시군요?'.format(height))
from sympy import symbols, expand

# 変数を定義
x, y = symbols('x y')

# 式を定義
# expr = (3*x - y + 1) * (2*x + y - 1)
expr = (x+4)*(x-4)

# 式を展開
expanded_expr = expand(expr)
print(expanded_expr)  # 結果を出力

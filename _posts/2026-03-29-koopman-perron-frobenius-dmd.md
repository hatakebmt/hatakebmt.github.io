---
title: "Phổ của Perron–Frobenius Operator, các thuật toán DMD/EDMD/GEDMD và Koopman Mode Decomposition"
date: 2026-03-29
categories:
  - Study Notes
tags:
  - Data-Driven Control
  - Koopman Operator
  - DMD
  - Dynamical Systems
  - Machine Learning
  - Control Theory
excerpt: "Ghi chú bài giảng về operator-theoretic methods cho hệ động lực học: phổ của Perron–Frobenius operator, ý nghĩa eigenvalue 1, và các thuật toán DMD/EDMD/GEDMD."
---

[**Download PDF**](/assets/pdf/DataDriven.pdf){: .btn .btn--primary}

---

## 1. Giới thiệu

Trong operator-theoretic methods for dynamical systems, hai toán tử tuyến tính vô hạn chiều đóng vai trò trung tâm:

- **Koopman operator**: tác động lên *observables* (hàm của trạng thái)
- **Perron–Frobenius (PF) operator**: tác động lên *densities* hay phân bố xác suất trên không gian trạng thái

> **Ý tưởng cốt lõi:** Dù hệ động lực gốc là phi tuyến trong không gian trạng thái, ta có thể mô tả nó bằng một **toán tử tuyến tính** trong không gian hàm.

---

## 2. Nhắc lại: Koopman và Perron–Frobenius

### Hệ động lực học rời rạc

$$x_{k+1} = T(x_k), \quad x_k \in \mathcal{X} \subset \mathbb{R}^n$$

### Koopman Operator

$$(\mathcal{K}g)(x) = g(T(x))$$

Đây là toán tử tác động lên hàm, không phải lên trạng thái trực tiếp.

### Perron–Frobenius Operator

Nếu $$\rho$$ là mật độ trên không gian trạng thái, PF operator $$\mathcal{P}$$ cho ta mật độ mới sau khi hệ tiến hóa một bước.

- **Koopman** nói observable biến đổi như thế nào
- **Perron–Frobenius** nói phân bố điểm trong không gian trạng thái biến đổi như thế nào

Hai toán tử này là **đối ngẫu** của nhau. Trong hữu hạn chiều với basis trực giao: $$P \approx K^\top$$.

---

## 3. Phổ của Perron–Frobenius Operator

### Eigenvalue 1 là đặc biệt

Một mật độ $$\rho^*$$ thỏa $$\mathcal{P}\rho^* = \rho^*$$ chính là một **steady-state distribution** hay **invariant density**:

$$\mathcal{P}\rho^* = 1 \cdot \rho^*$$

> **Eigenfunction của PF ứng với eigenvalue 1 mã hóa động học trạng thái dừng của hệ.**

**Số lượng eigenvalue 1** mang thông tin về số lượng steady-state distributions:
- 1 hệ có 1 điểm hút → PF có 1 eigenfunction ứng với eigenvalue 1
- Hệ có 2 điểm cân bằng ổn định → PF có thể có 2 eigenfunctions ứng với eigenvalue 1

---

## 4. Ví dụ

### Ví dụ 1: $$\dot{x} = -x$$

Nghiệm: $$x(t) = x(0)e^{-t}$$. Mọi quỹ đạo hội tụ về 0 → steady-state distribution là $$\delta_0$$ (Dirac delta tại gốc).

### Ví dụ 2: Logistic map (chế độ hỗn loạn)

$$x_{k+1} = rx_k(1-x_k)$$

Pointwise dynamics có thể chaotic, nhưng nếu theo dõi một **phân bố điểm**, nó có thể hội tụ về một density ổn định đẹp — chính là eigenfunction của PF ứng với eigenvalue 1.

> **Triết lý quan trọng:** Pointwise dynamics có thể hỗn loạn, nhưng *distributional dynamics* trong function space lại có thể rất có cấu trúc.

---

## 5. Mục tiêu Computation: Xấp xỉ Toán tử từ Dữ liệu

Câu hỏi thực dụng: nếu chỉ có dữ liệu, làm sao xấp xỉ Koopman hoặc PF operator?

**Điểm then chốt:** Vì Koopman và PF là tuyến tính, các thuật toán xấp xỉ quy về **least-squares**.

---

## 6. Dynamic Mode Decomposition (DMD)

### Dữ liệu vào

$$X = \begin{bmatrix} x_1 & x_2 & \cdots & x_{m-1} \end{bmatrix}, \quad X' = \begin{bmatrix} x_2 & x_3 & \cdots & x_m \end{bmatrix}$$

### Bài toán

Tìm $$A \in \mathbb{R}^{n \times n}$$ sao cho $$X' \approx AX$$:

$$A^\star = \arg\min_A \|X' - AX\|_F^2 = X'X^\dagger$$

### Tính bằng SVD

$$X = U\Sigma V^*, \quad A^\star = X'V\Sigma^{-1}U^*$$

### Ý nghĩa của DMD

- Khai thác **cấu trúc thời gian** trong dữ liệu
- Tìm các mode quan trọng về mặt **động lực học**
- Khác với POD/SVD: DMD giữ cấu trúc nhân quả $$x_k \mapsto x_{k+1}$$

---

## 7. Extended DMD (EDMD)

DMD hoạt động trong không gian trạng thái gốc. EDMD **lift** dữ liệu lên không gian observable giàu hơn.

### Dictionary of Observables

$$\Psi(x) = \begin{bmatrix} \psi_1(x) \\ \vdots \\ \psi_d(x) \end{bmatrix} \in \mathbb{R}^d, \quad d \geq n$$

### Bài toán EDMD

Tìm $$K \in \mathbb{R}^{d \times d}$$ sao cho $$\Psi_{X'} \approx K\Psi_X$$:

$$K = G^{-1}A, \quad G = \frac{1}{m}\Psi_X\Psi_X^\top, \quad A = \frac{1}{m}\Psi_X\Psi_{X'}^\top$$

### Eigenfunctions xấp xỉ của Koopman

Giải $$Kw_j = \lambda_j w_j$$, khi đó:

$$\phi_j(x) \approx w_j^\top \Psi(x)$$

> **Cảnh báo ký hiệu:** Tùy convention cột/hàng, ma trận thu được có thể là $$K$$ hoặc $$K^\top$$. Nhầm là đang tính eigenfunctions của Koopman hay Perron–Frobenius!

---

## 8. Generator EDMD (GEDMD)

Với hệ liên tục $$\dot{x} = f(x)$$, thay vì xấp xỉ Koopman operator, ta xấp xỉ **generator** của nó:

$$\mathcal{L}g = \nabla g(x)^\top f(x)$$

### Dữ liệu cần có

$$(x_\ell, \dot{x}_\ell),\quad \ell = 1, \ldots, m$$

### Bài toán

$$L^\star = \dot{\Psi}_X \Psi_X^\dagger, \quad \text{với} \quad \dot{\psi}_k(x_\ell) = \nabla\psi_k(x_\ell)^\top \dot{x}_\ell$$

---

## 9. Hai Nguồn Sai Số Xấp Xỉ

1. **Sai số do hữu hạn dictionary**: chiếu toán tử thật lên không gian con hữu hạn chiều
2. **Sai số do hữu hạn dữ liệu**: xấp xỉ các inner products bằng trung bình mẫu — thường $$\mathcal{O}(1/\sqrt{m})$$

---

## 10. Koopman Mode Decomposition

### Ý tưởng

Biểu diễn một observable bất kỳ qua eigenfunctions:

$$g(x) \approx \sum_{i=1}^r \alpha_i \phi_i(x)$$

### Lợi thế lớn

Vì $$\mathcal{K}\phi_i = \lambda_i\phi_i$$, sau $$n$$ bước:

$$\mathcal{K}^n g \approx \sum_{i=1}^r \alpha_i \lambda_i^n \phi_i$$

> Sau khi decomposed observable vào eigenbasis của Koopman, **propagation theo thời gian trở nên gần như tầm thường**: chỉ cần nhân thêm $$\lambda_i^n$$.

### Tính đại số của Eigenfunctions

Nếu $$\phi_i, \phi_j$$ là eigenfunctions với eigenvalues $$\lambda_i, \lambda_j$$:

$$\mathcal{K}(\phi_i\phi_j) = \lambda_i\lambda_j \phi_i\phi_j$$

Từ một số nhỏ eigenfunctions ta có thể xây dựng họ basis rất giàu.

---

## 11. Ứng dụng

| Ứng dụng | Mô tả |
|----------|-------|
| **Propagation of uncertainty** | Decompose density ban đầu → nhân eigenvalues |
| **Reachability** | Đẩy tập trạng thái theo dynamics qua operator |
| **Safety** | Occupation measure của vùng cấm = 0 |
| **Control design** | Bài toán phi lồi trong state-space → bài toán lồi trong measure space |

---

## 12. Invariant Measure và Ergodicity

### Van der Pol Oscillator

Van der Pol có một equilibrium không ổn định và một stable limit cycle. Eigenfunction của PF ứng với eigenvalue 1 phải được support trên limit cycle đó.

Invariant measure không chỉ nói **ở đâu** hệ tồn tại dài hạn, mà còn nói **nó ở đó nhiều hay ít** — đây là thông tin "occupation".

### Ergodicity

Hệ ergodic với measure $$\mu$$ nếu time average = space average:

$$\lim_{T\to\infty} \frac{1}{T}\int_0^T g(x(t))\,dt = \int g(x)\,d\mu(x)$$

### Occupation Measure

Nếu một vùng bị cấm về an toàn, safe behavior tương ứng với:

$$\text{occupation của vùng đó} = 0$$

---

## 13. Tóm tắt Thuật toán

### DMD
1. Thu thập snapshots, tạo $$X, X'$$
2. $$A^\star = X'X^\dagger$$ (qua SVD)
3. Tính eigenvalues/eigenvectors của $$A^\star$$

### EDMD
1. Chọn dictionary $$\psi_1, \ldots, \psi_d$$
2. Tạo lifted data $$\Psi_X, \Psi_{X'}$$
3. $$K = G^{-1}A$$
4. Eigenfunctions: $$\phi_j(x) \approx w_j^\top\Psi(x)$$

### GEDMD
1. Thu thập $$(x_\ell, \dot{x}_\ell)$$
2. Tính $$\Psi_X, \dot{\Psi}_X$$
3. $$L^\star = \dot{\Psi}_X\Psi_X^\dagger$$
4. Tính eigenvalues/eigenvectors của $$L^\star$$

---

## 14. Những Điểm Tư Tưởng Cốt Lõi

1. Hệ phi tuyến trong state-space → tuyến tính trong function space
2. Koopman: tác động lên observables; PF: tác động lên densities/measures
3. Eigenfunction của PF với eigenvalue 1 → steady-state / invariant distribution
4. Số eigenvalue 1 = số steady-state distributions
5. DMD = least-squares có tính thời gian; SVD/POD = modes giàu năng lượng
6. EDMD lift dữ liệu bằng observables phi tuyến
7. GEDMD cho continuous-time generator
8. Duality Koopman–PF qua chuyển vị / Gram normalization
9. Occupation measure là chìa khóa nối safety, reachability, và control design

---

> **Tư tưởng tổng quát:**
> Thay vì cố giải trực tiếp hệ phi tuyến trong state-space, ta học cách đẩy observables hoặc densities qua một toán tử tuyến tính trong function space, rồi khai thác cấu trúc phổ của toán tử đó.
